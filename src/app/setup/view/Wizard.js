Ext.define('Mfw.setup.Wizard', {
    extend: 'Ext.Container',
    layout: 'center',
    style: 'background: #999',

    viewModel: {
        data: {
            settings: {}
        },
        formulas: {
            bridgedOptions: function (get) {
                var interfaces = [];
                console.log('here');
                Ext.getStore('interfaces').each(function (interface) {
                    // interface should be ADDRESSED
                    if (interface.get('interfaceId') === get('intf.interfaceId') ||
                        interface.get('configType') !== 'ADDRESSED') {
                            return;
                        }

                    interfaces.push({
                        text: interface.get('name'),
                        value: interface.get('interfaceId')
                    });
                });
                return interfaces;
            }
        }
    },

    alias: 'widget.setup-wizard',
    controller: 'wizard',


    items: [{
        xtype: 'panel',
        reference: 'wizard',

        width: '55%',
        minWidth: 980,
        height: '70%',
        style: 'border-radius: 8px;',
        shadow: true,
        // bodyPadding: 24,

        // masked: { xtype: 'loadmask' },

        layout: {
            type: 'card',
            animation: null,
            // animation: {
            //     type: 'fade', // slide
            //     duration: 150,
            //     direction: 'horizontal'
            // },
            indicator: {
                reference: 'indicator',
                tapMode: 'item',
                publishes: [
                    'activeIndex',
                    'count'
                ]
            }
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            style: 'font-size: 24px; font-weight: 100; color: #777;',
            // shadow: true,
            padding: '8 16 4 16',
            zIndex: 10,
            items: [{
                xtype: 'component',
                html: '<img src="/static/res/untangle-logo.png" width=90 style="vertical-align: middle; margin-right: 16px;"/>'
            }, {
                xtype: 'component',
                html: 'Setup'
            }, '->', {
                xtype: 'component',
                hidden: true,
                bind: {
                    html: 'Step {indicator.activeIndex + 1} of {indicator.count}',
                    hidden: '{indicator.count === 0}'
                }

            }]
        }],
        bbar: {
            reference: 'bbar',
            zIndex: 998,
            padding: 16,
            defaults: {
                width: 100
            },
            items: [{
                text: 'Back',
                ui: 'action',

                // iconCls: 'x-fa fa-angle-double-left',
                handler: 'onBack',
                hidden: true,
                hideMode: 'visibility',
                bind: {
                    disabled: '{!indicator.activeIndex}',
                    hidden: '{!indicator.activeIndex}'
                }
            }, {
                xtype: 'container',
                hidden: true,
                hideMode: 'visibility'
            },
            // the indicator is inserted here
            // {
            //     text: 'Cancel',
            //     margin: '0 16 0 0',
            //     style: 'color: #999;',
            //     handler: 'onCancel',
            //     hidden: true,
            //     hideMode: 'visibility',
            //     bind: {
            //         disabled: '{indicator.activeIndex == indicator.count - 1}',
            //         hidden: '{indicator.activeIndex == indicator.count - 1 || !indicator.activeIndex}'
            //     }
            // },
            {
                text: 'Continue',
                ui: 'action',
                // iconCls: 'x-fa fa-angle-double-right',
                iconAlign: 'right',
                handler: 'onContinue',
                hidden: true,
                hideMode: 'visibility',
                bind: {
                    disabled: '{indicator.activeIndex == indicator.count - 1}',
                    hidden: '{indicator.activeIndex == indicator.count - 1}'
                }
            }]
        }
    }]

});


