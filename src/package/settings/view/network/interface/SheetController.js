Ext.define('Mfw.settings.network.interface.SheetController', {
    extend: 'Mfw.cmp.grid.SheetEditorController',
    alias: 'controller.settings-interface-sheet',

    onInitialize: function () {
        var me = this, vm = me.getViewModel();
        vm.bind('{record.wan}', function (wan) {
            if (!wan) {
                vm.set('record.v4ConfigType', 'STATIC');
                vm.set('record.v6ConfigType', 'STATIC');
            }
        });
    },


    /**
     * updates card layout animation based if it's main card or subcards
     */
    onActiveItemChange: function (cnt, card, oldValue) {
        var me = this, vm = me.getViewModel();
        // console.log(value.getItemId());
        // console.log(value.title);
        vm.set({
            title: card.headerTitle,
            cardId: card.getItemId(),
            isMainCard: card.getItemId() === 'main'
        });
        // if (cnt.getActiveItem().getItemId() === 'maincard') {
        // }
    },

    // onApply: function (btn) {
    //     var me = this, vm = me.getViewModel(),
    //         sheet = me.getView(),
    //         grid = sheet.up('grid'),
    //         form = sheet.down('formpanel');
    //     // // console.log(vm.get('rec').isValid());
    //     var invalidFields = '';

    //     // Ext.Object.each(form.getFields(), function(key, field) {
    //     //     if (field.validate()) { return; }
    //     //     invalidFields += '<strong>' + (field.errorLabel || field.getLabel()) + '</strong>: <span style="color: red;">' + field.getErrorMessage() + '</span><br/>';
    //     // })
    //     // if (invalidFields.length > 0) {
    //     //     Ext.Msg.alert('Invalid fields'.t(), 'Please correct the following: <br/>' + invalidFields);
    //     //     return;
    //     // }

    //     if (sheet.isNewRecord) {
    //         grid.getStore().add(vm.get('rec'));
    //     }

    //     // Ext.Msg.confirm('<span class="x-fa fa-cogs"></span> Apply Changes?'.t(),
    //     //     '<p><strong>It might take a while for the changes to take effect!</strong></p>' +
    //     //     '<p>If you want to make additional changes, do them before saving!</p>',
    //     //     function (answer) {
    //     //         if (answer === 'no') {
    //     //             return;
    //     //         }
    //     //         btn.up('dialog').hide();
    //     //     });

    //     btn.up('sheet').hide();

    // },


    onBack: function () {
        var me = this, formpanel = me.getView().down('formpanel');
        switch (formpanel.getActiveItem().getItemId()) {
            case 'ipv4-aliases': formpanel.setActiveItem('#ipv4'); break;
            case 'ipv6-aliases': formpanel.setActiveItem('#ipv6'); break;
            case 'vrrp-aliases': formpanel.setActiveItem('#vrrp'); break;
            case 'dhcp-options': formpanel.setActiveItem('#dhcp'); break;
            default: formpanel.setActiveItem(0); break;
        }
    },

    addGridItem: function () {
        var me = this, grid = me.getView().down('formpanel').getActiveItem();

        grid.getStore().add(
            { v4Address: '12345', v4Prefix: '10' }
        );
    },

    onHide: function (sheet) {
        sheet.down('formpanel').setActiveItem('interface-main');
    }

});
