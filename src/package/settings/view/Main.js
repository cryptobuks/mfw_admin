Ext.define('Mfw.settings.view.Main', {
    extend: 'Ext.Panel',
    alias: 'widget.settings',

    controller: 'settings',

    layout: 'fit',

    config: {
        type: 'api' // api or static
    },

    items: [{
        layout: 'fit',
        xtype: 'panel',
        zIndex: 999,
        resizable: {
            split: true,
            edges: 'east'
        },

        docked: 'left',
        width: '300',

        bbar: {
            shadow: true,
            items: [{
                xtype: 'searchfield',
                ui: 'faded',
                flex: 1,
                placeholder: 'Find settings...'.t(),
                listeners: {
                    change: 'filterSettings'
                }
            }]
        },

        items: [{
            xtype: 'treelist',
            userCls: 'no-icons',
            scrollable: true,
            ui: 'nav',
            style: {
                background: '#f5f5f5'
            },
            animation: {
                duration: 150,
                easing: 'ease'
            },
            singleExpand: true,
            expanderFirst: false,
            expanderOnly: false,
            selectOnExpander: true,
            highlightPath: false,
//            store: 'settings-nav',
            store: {
                type: 'settings-nav',
                // autoLoad: true
            },
            listeners: {
                selectionchange: 'onSelectionChange'
            }
        }]
    }],
    listeners: {
        // initialize: 'onInitialize',
        deactivate: 'onDeactivate'
    }

});
