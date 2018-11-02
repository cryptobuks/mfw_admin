Ext.define('Mfw.App', {
    extend: 'Mfw.AppBase',

    config: {
        packages: ['auth', 'reports', 'settings'],
        resourcesPath: 'res',
        account: null,
        routeAfterAuth: null
    },

    routes: {
        '*': { before: 'checkAuth' },
        'dashboard:query': { before: 'onDashboardBefore', action: 'onDashboard', conditions: { ':query' : '(.*)' } },
        'reports:query': { before: 'onReportsBefore', action: 'onReports', conditions: { ':query' : '(.*)' } },
        'settings:route': { action: 'onSettings', conditions: { ':route' : '(.*)' } }
    },

    setViews: function () {
        Mfw.app.viewport.add([
            { xtype: 'mfw-header' },
            { xtype: 'mfw-dashboard' },
            { xtype: 'mfw-reports' },
            { xtype: 'mfw-pkg-settings' }
        ]);
    },


    onDashboardBefore: function (action) {
        // var me = this, conds, action,
        //     vm = me.getDashboardView().getViewModel();

        // if (arguments.length === 1) {
        //     action = arguments[0];
        // } else {
        //     conds = arguments[0].replace('?', '');
        //     action = arguments[1];
        // }


        // if (!conds) {
        //     // if no condition parameters, load those condition params from view model and redirect
        //     Mfw.app.redirectTo('dashboard?' + Util.modelToParams('dashboard', vm.get('conditions')));
        //     action.stop();
        // } else {
        //     // otherwise update View Model with the new condition params
        //     vm.set('conditions', Util.paramsToModel('dashboard', conds));
        //     action.resume();
        // }
        action.resume();
    },

    onDashboard: function () {
        Mfw.app.viewport.setActiveItem('mfw-dashboard');
    },

    /**
     * Updates route based on existance or not of predefined conditions in ViewModel
     * arguments of the method are ([query], action) with query missing if not set;
     * `route` can be seen as the path to a specific report category/name
     * A full query can look like
     * #reports/category_name/report_name?since=today&username:>%3D:test:1
     */
    onReportsBefore: function (action) {
        // var me = this,
        //     args = arguments,
        //     reportsStore = Ext.getStore('reports');

        // if (!reportsStore.isLoaded()) {
        //     // fetch reports store
        //     Ext.getStore('reports').load({
        //         callback: function(records, operation, success) {
        //             if (success) {
        //                 // create the reports tree
        //                 me.onReportsResume(args);
        //             }
        //         }
        //     });
        // } else {
        //     me.onReportsResume(args);
        // }
        action.resume();
    },

    onReportsResume: function (arguments) {
        var me = this, route = '', conds, query = null, action,
            reportsVm = me.getReportsView().getViewModel();

        if (arguments.length === 1) {
            action = arguments[0];
        } else {
            query = arguments[0];
            action = arguments[1];
        }

        if (query) {
            route = query.split('?')[0];
            conds = query.split('?')[1];
        }

        if (!conds) {
            // if no condition parameters, load those condition params from view model and redirect
            Mfw.app.redirectTo('reports' + route + '?' + Util.modelToParams('reports', reportsVm.get('conditions')));
            action.stop();
        } else {
            // otherwise update View Model with the new condition params
            reportsVm.set('conditions', Util.paramsToModel('reports', conds));
            action.resume();
        }
    },

    onReports: function (query) {
        // var me = this, route = query.split('?')[0], record,
        //     list = Ext.Viewport.down('mfw-reports').down('treelist'), node;

        // if (!route) {
        //     list.getStore().getRoot().collapse(true);
        //     list.setSelection(null);
        // } else {
        //     node = list.getStore().findNode('href', 'reports' + route);
        //     list.setSelection(node);
        // }

        // if (node && node.isLeaf()) {
        //     record = Ext.getStore('reports').findRecord('_href', node.get('href'));
        //     me.getReportsView().chart.getViewModel().set('record', record);
        // }

        Mfw.app.viewport.setActiveItem('mfw-reports');
    },



});
// Ext.define('Mfw.App', {
//     extend: 'Ext.app.Application',
//     name: 'Mfw',

//     config: {
//         account: null,
//         routeAfterAuth: null
//     },

//     packages: ['auth', 'settings'],
//     resPath: '../res',

//     routes: {
//         // if auth package included, check auth on ebery route
//         '*': { before: 'checkAuth' },
//         'dashboard:query': { before: 'onDashboardBefore', action: 'onDashboard', conditions: { ':query' : '(.*)' } },
//         /**
//          * if settings package included add settings route
//          * onSettings method is defined in settings package
//          */
//         'settings:p1': { action: 'onSettings', conditions: { ':p1' : '(.*)' } }
//     },

//     viewport: {
//         viewModel: {},
//         layout: 'card'
//     },

//     checkAuth: function (action) {
//         var me = this,
//             hash = window.location.hash;

//         if (!Mfw.app.getAccount()) {
//             Ext.Ajax.request({
//                 url: '/account/status',
//                 success: function (response) {
//                     Mfw.app.setAccount(Ext.decode(response.responseText));
//                     me.setViews();
//                     action.resume();
//                 },

//                 failure: function() {
//                     Mfw.app.viewport.removeAll(true, true);
//                     Mfw.app.viewport.add({
//                         xtype: 'mfw-pkg-auth'
//                     });
//                     Mfw.app.redirectTo('login');
//                     Mfw.app.setRouteAfterAuth(hash);
//                 }
//             });
//         } else {
//             action.resume();
//         }
//     },

//     setViews: function () {
//         Mfw.app.viewport.removeAll(true, true);
//         Mfw.app.viewport.add([
//             { xtype: 'mfw-header' },
//             { xtype: 'mfw-dashboard' },
//             { xtype: 'mfw-pkg-settings' }
//         ]);
//     },


//     /**
//      * Updates route based on existance or not of predefined conditions in ViewModel
//      * arguments of the method are ([query], action) with query missing if not set
//      */
//     onDashboardBefore: function (action) {
//         // var me = this, conds, action,
//         //     vm = me.getDashboardView().getViewModel();

//         // if (arguments.length === 1) {
//         //     action = arguments[0];
//         // } else {
//         //     conds = arguments[0].replace('?', '');
//         //     action = arguments[1];
//         // }


//         // if (!conds) {
//         //     // if no condition parameters, load those condition params from view model and redirect
//         //     Mfw.app.redirectTo('dashboard?' + Util.modelToParams('dashboard', vm.get('conditions')));
//         //     action.stop();
//         // } else {
//         //     // otherwise update View Model with the new condition params
//         //     vm.set('conditions', Util.paramsToModel('dashboard', conds));
//         //     action.resume();
//         // }
//         action.resume();
//     },

//     onDashboard: function () {
//         Mfw.app.viewport.setActiveItem('mfw-dashboard');
//     },

//     launch: function () {
//         console.log('Admin App Launch ...')
//         var me = this, scripts = [];
//         Ext.Array.each(me.packages, function(pkg) {
//             scripts.push('mfw/pkg/mfw-pkg-' + pkg + '.js')
//         });


//         Ext.Loader.loadScriptsSync(scripts);

//         // need this trick to trigger beforeAnyRoute in case of empty hash
//         if (!window.location.hash) {
//             Mfw.app.redirectTo('#dashboard');
//         }
//     }
// });
