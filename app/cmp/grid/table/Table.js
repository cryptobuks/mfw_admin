Ext.define('Mfw.cmp.grid.table.Table', {
    extend: 'Ext.grid.Grid',
    alias: 'widget.tablegrid',

    viewModel: {
        data: {
            selectedChain: null
        },
        formulas: {
            selectionModel: function (get) {
                return {
                    mode: 'multi',
                    cells: false,
                    // checkbox: true,
                    drag: true,
                    rows: get('selectedChain.editable')
                }
            }
        }
    },

    bind: {
        store: '{selectedChain.rules}',
        selectable: '{selectionModel}'
    },

    controller: 'tablegrid',

    config: {
        api: null,
        actionsColumn: null
    },

    itemConfig: {
        viewModel: true, // important
    },

    emptyText: 'No Data!'.t(),
    scrollable: true,
    sortable: false,
    groupable: false,

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        padding: '0 8',
        items: [{
            xtype: 'button',
            itemId: 'chainsmenu',
            bind: {
                text: '{selectedChain.name}'
            },
            menu: {
                userCls: 'x-htmlmenu',
                defaults: 'menucheckitem'
                // anchor: true,
            }
        }, {
            xtype: 'component',
            userCls: 'chain-base',
            html: 'BASE'.t(),
            hidden: true,
            bind: {
                hidden: '{!selectedChain.base}'
            }
        }, {
            xtype: 'component',
            userCls: 'chain-default',
            html: 'DEFAULT'.t(),
            hidden: true,
            bind: {
                hidden: '{!selectedChain.default}'
            }
        }, {
            xtype: 'component',
            userCls: 'chain-editable',
            html: 'READONLY'.t(),
            hidden: true,
            bind: {
                hidden: '{selectedChain.editable}'
            }
        }, '->', {
            xtype: 'component',
            style: 'font-size: 12px;',
            html: 'Move Rule',
            hidden: true,
            bind: { hidden: '{selcount !== 1}' }
        }, {
            xtype: 'segmentedbutton',
            allowToggle: false,
            margin: '0 8',
            hidden: true,
            bind: { hidden: '{selcount !== 1}' },
            defaults: {
                ui: 'default',
                handler: 'onSort',
            },
            items: [{
                iconCls: 'x-fa fa-angle-double-up',
                tooltip: 'Move First'.t(),
                pos: 'first'
            }, {
                iconCls: 'x-fa fa-angle-up',
                tooltip: 'Move Up'.t(),
                pos: 'up'
            }, {
                iconCls: 'x-fa fa-angle-down',
                tooltip: 'Move Down'.t(),
                pos: 'down'
            }, {
                iconCls: 'x-fa fa-angle-double-down',
                tooltip: 'Move Last'.t(),
                pos: 'last'
            }, {
                iconCls: 'md-icon-close',
                tooltip: 'Cancel'.t(),
                pos: null
            }]
        }, {
            xtype: 'toolbarseparator',
            hidden: true,
            bind: { hidden: '{selcount !== 1}' }
        }, {
            text: 'New Rule',
            iconCls: 'md-icon-add',
            hidden: true,
            bind: { hidden: '{!selectedChain.editable}' },
            handler: 'onNewRule'
        }, {
            xtype: 'toolbarseparator',
            hidden: true,
            bind: { hidden: '{!selectedChain.editable}' }
        }, {
            iconCls: 'md-icon-edit',
            tooltip: {
                html: 'Edit chain'.t(),
                anchor: true,
                hideDelay: 0,
                showDelay: 0
            },
            hidden: true,
            bind: { hidden: '{!selectedChain.editable}' },
            operation: 'EDIT',
            handler: 'onChainOperation'
        }, {
            iconCls: 'md-icon-delete',
            tooltip: {
                html: 'Delete chain'.t(),
                anchor: true,
                hideDelay: 0,
                showDelay: 0
            },
            hidden: true,
            bind: { hidden: '{!selectedChain.editable}' },
            handler: 'onDeleteChain'
        }, {
            iconCls: 'md-icon-star',
            tooltip: {
                html: 'Set as default chain'.t(),
                anchor: true,
                hideDelay: 0,
                showDelay: 0
            },
            hidden: true,
            bind: { hidden: '{!selectedChain.editable || selectedChain.default}' },
            handler: 'onSetDefaultChain'
        }]
    }],

    columns: [{
        text: 'Id'.t(),
        dataIndex: 'ruleId',
        menuDisabled: true,
        resizable: false,
        width: 50,
        align: 'right',
        // hidden: true,
        renderer: function (v) {
            return ( v === 0 ) ? 'new' : '#' + v;
        }
    }, {
        xtype: 'checkcolumn',
        dataIndex: 'enabled',
        text: 'Enabled',
        width: 80,
        menuDisabled: true,
        resizable: false,
        // width: 100,
        // dataIndex: 'enabled',
        // cell: {
        //     xtype: 'widgetcell',
        //     widget: {
        //         xtype: 'togglefield',
        //         margin: '0 10',
        //         disabled: true,
        //         bind: {
        //             disabled: '{!selectedChain.editable}'
        //         }
        //     }
        // }
    }, {
        text: 'Description',
        dataIndex: 'description',
        menuDisabled: true,
        minWidth: 400
    }, {
        text: 'Conditions'.t(),
        dataIndex: 'conditions()',
        menuDisabled: true,
        flex: 1,
        cell: {
            userCls: 'ctip',
            bodyStyle: {
                // padding: 0
                padding: '0 16px 0 0'
            },
            encodeHtml: false
        },
        renderer: function (conditions, record) {
            var strArr = [], op;

            record.conditions().each(function (c) {
                if (c.get('op') === "IS") {
                    op = ' &nbsp;<i class="x-fa fa-hand-o-right" style="font-weight: normal;"></i>&nbsp; '
                } else {
                    op = ' &nbsp;<i class="x-fa fa-hand-stop-o" style="color: red; font-weight: normal;"></i>&nbsp; '
                }
                strArr.push('<div class="condition"><span class="eee">' + Ext.getStore('ruleconditions').findRecord('type', c.get('type')).get('name') + '</span>' +
                       op + '<strong>' + c.get('value') + '</strong></div>');
            });
            if (strArr.length > 0) {
                return strArr.join('');
            } else {
                return '<span style="color: #999; font-style: italic; font-size: 11px; padding: 0 10px;">No Conditions!</span>'
            }
        }
    }],

    listeners: {
        initialize: 'onInitialize',
        select: 'onSelect',
        deselect: 'onDeselect',
        beforesave: 'beforeSave', // custom event to prepare records
        destroy: 'onDestroy'
    }
});