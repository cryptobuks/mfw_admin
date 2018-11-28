Ext.define('Mfw.reports.Util', {
    alternateClassName: 'ReportsUtil',
    singleton: true,

    routeToQuery: function (route) {
        var query = 'reports?';
        // var hash = Ext.Object.fromQueryString(window.location.hash.replace('#reports?', '')), route = 'reports?';

        if (route.cat) { query += 'cat=' + route.cat; }
        if (route.rep) { query += '&rep=' + route.rep; }

        if (route.predefinedSince) {
            query += '&since=' + route.predefinedSince;
        } else {
            query += '&since=' + (route.since || 1);
        }

        if (route.until) {
            query += '&until=' + route.until;
        }

        Ext.Array.each(route.columns, function(column) {
            query += '&' + column.column + ':' + encodeURIComponent(column.operator) + ':' + encodeURIComponent(column.value) + ':' + (column.autoFormatValue === true ? 1 : 0);
        });

        return query;
    },

    queryToRoute: function (query) {
        var decodedParam,
            decodedParamParts,
            key, val,
            route= {
                cat: null,
                rep: null,
                predefinedSince: 'today',
                since: null,
                until: null,
                columns: []
            };

        if (query[0] === '?') {
            query = query.substr(1);
        }


        Ext.Array.each(query.split('&'), function (paramCond) {
            decodedParam = decodeURIComponent(paramCond);
            if (decodedParam.indexOf(':') > 0) {
                decodedParamParts = decodedParam.split(':');
                route.columns.push({
                    column: decodedParamParts[0],
                    operator: decodedParamParts[1],
                    value: decodedParamParts[2],
                    autoFormatValue: parseInt(decodedParamParts[3], 10) === 1 ? true : false,
                });
            } else {
                decodedParamParts = decodedParam.split('=');
                key = decodedParamParts[0];
                val = decodedParamParts[1];

                if (key === 'since') {
                    var since, predefSince = val, sinceDate = new Date(parseInt(val, 10));

                    switch (val) {
                        case '1h': since = Ext.Date.subtract(Util.serverToClientDate(new Date()), Ext.Date.HOUR, 1); break;
                        case '6h': since = Ext.Date.subtract(Util.serverToClientDate(new Date()), Ext.Date.HOUR, 6); break;
                        case 'today': since = Ext.Date.clearTime(Util.serverToClientDate(new Date())); break;
                        case 'yesterday': since = Ext.Date.subtract(Ext.Date.clearTime(Util.serverToClientDate(new Date())), Ext.Date.DAY, 1); break;
                        case 'thisweek': since = Ext.Date.subtract(Ext.Date.clearTime(Util.serverToClientDate(new Date())), Ext.Date.DAY, (Util.serverToClientDate(new Date())).getDay()); break;
                        case 'lastweek': since = Ext.Date.subtract(Ext.Date.clearTime(Util.serverToClientDate(new Date())), Ext.Date.DAY, (Util.serverToClientDate(new Date())).getDay() + 7); break;
                        case 'month': since = Ext.Date.getFirstDateOfMonth(Util.serverToClientDate(new Date())); break;
                        default:
                            if (sinceDate.getTime() > 0 && Ext.Date.diff(sinceDate, new Date(), Ext.Date.YEAR) < 1) {
                                since = sinceDate;
                                predefSince = sinceDate.getTime();
                            } else {
                                since = Ext.Date.clearTime(Util.serverToClientDate(new Date()));
                                predefSince = 'today';
                            }
                            break;

                    }
                    route.predefinedSince = predefSince;
                    route.since = since.getTime();
                    return;
                }

                if (key === 'until') {
                    // remove until in case of predefined since
                    if (Ext.Array.contains(['1h', '6h', 'today', 'yesterday', 'thisweek', 'lastweek', 'month'], route.predefinedSince)) {
                        route.until = null;
                    } else {
                        var until, untilDate = new Date(parseInt(val, 10));
                        if (untilDate.getTime() > 0) {
                            until = untilDate.getTime();
                        } else {
                            until = null;
                        }
                        route.until = until;
                    }
                    return;
                }

                if (key === 'cat') {
                    route.cat = val;
                }
                if (key === 'rep') {
                    route.rep = val;
                }
            }
        });
        return route;
    },

    fetchReportData: function (report, cb) {
        // create query
        Ext.Ajax.request({
            url: '/api/reports/create_query',
            params: Ext.JSON.encode(report.getData(true)),
            success: function(response) {
                // get data
                var queryId = Ext.decode(response.responseText);
                Ext.Ajax.request({
                    url: '/api/reports/get_data/' + queryId,
                    success: function (response) {
                        var data = Ext.decode(response.responseText);
                        cb(data);
                        // close query
                        // Ext.Ajax.request({
                        //     url: '/api/reports/close_query/' + queryId,
                        //     success: function (response) {
                        //         var data = Ext.decode(response.responseText);
                        //         console.log(data);
                        //     },
                        //     failure: function () {
                        //         console.error('Unable to to close query ' + queryId);
                        //     }
                        // });
                    },
                    failure: function (response) {
                        console.error('Unable to fetch data for query ' + queryId);
                    }
                });
            },
            failure: function (response, opts) {
                console.error('Unable to create query!');
            }
        });
    }

});