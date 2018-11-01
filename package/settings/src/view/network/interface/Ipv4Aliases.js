Ext.define('Mfw.settings.network.interface.Ipv4Aliases', {
    extend: 'Ext.grid.Grid',
    alias: 'widget.interface-ipv4-aliases',
    itemId: 'ipv4-aliases',

    headerTitle: 'IPv4 Aliases'.t(),

    platformConfig: {
        desktop: {
            plugins: {
                gridcellediting: true
            }
        },

        '!desktop': {
            plugins: {
                grideditable: true
            }
        }
    },

    // plugins: {
    //     gridcellediting: true
    // },

    store: {
        data: [
            { v4Address: '1.2.3.4', v4Prefix: '8' }
        ]
    },

    columns: [{
        text: 'Address'.t(),
        dataIndex: 'v4Address',
        editable: true
    }, {
        text: 'Netmask/Prefix'.t(),
        dataIndex: 'v4Prefix',
        editable: true,
        flex: 1
    }, {
        width: 44,
        menuDisabled: true,
        cell: {
            tools: [{
                type: 'delete',
                iconCls: 'x-fa fa-times'
            }]
        }
    }]

});
