Ext.define('Mfw.settings.network.interface.SheetViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.settings-interface-viewmodel',

    data: {
        rec: null,
        title: 'Edit Interface'.t(),
        cardId: 'main',
        isMainCard: true
    },
    formulas: {
        availableSettings: function (get) {
            var settings = [], v4ConfigType, v6ConfigType;

            switch (get('record.v4ConfigType')) {
                case 'DHCP': v4ConfigType = 'DHCP'.t(); break;
                case 'STATIC': v4ConfigType = 'Static'.t(); break;
                case 'PPPOE': v4ConfigType = 'PPPoE'.t(); break;
                default:
            }

            switch (get('record.v6ConfigType')) {
                case 'DHCP': v6ConfigType = 'DHCP'.t(); break;
                case 'SLAAC': v6ConfigType = 'SLAAC'.t(); break;
                case 'ASSIGN': v6ConfigType = 'Assign'.t(); break;
                case 'STATIC': v6ConfigType = 'Static'.t(); break;
                case 'DISABLED': v6ConfigType = 'Disabled'.t(); break;
                default:
            }

            if (get('record.configType') === 'ADDRESSED') {
                settings.push({ text: 'IPv4'.t(), status: v4ConfigType, card: 'ipv4' });
                settings.push({ text: 'IPv6'.t(), status: v6ConfigType, card: 'ipv6' });
                if (!get('record.wan')) {
                    settings.push({ text: 'DHCP'.t(), status: get('record.dhcpEnabled') ? 'Enabled'.t() : 'Disabled'.t(), card: 'dhcp' });
                }
                settings.push({ text: 'VRRP (Redundancy)'.t(), status: get('record.vrrpEnabled') ? 'Enabled'.t() : 'Disabled'.t(), card: 'vrrp' });
            }

            if (get('record.type') === 'WIFI') {
                settings.push({ text: 'WiFi'.t(), status: '', card: 'wifi' });
            }

            return settings;
        },

        ipv6Configs: function (get) {
            var options;
            if (get('record.wan')) {
                options = [
                    { text: 'Disabled'.t(),  value: 'DISABLED' },
                    { text: 'Static'.t(),   value: 'STATIC' },
                    { text: 'SLAAC'.t(), value: 'SLAAC' },
                    { text: 'DHCP'.t(), value: 'DHCP' }
                ];
            } else {
                options = [
                    { text: 'Disabled'.t(),  value: 'DISABLED' },
                    { text: 'Static'.t(),   value: 'STATIC' },
                    { text: 'Assign'.t(), value: 'ASSIGN' }
                ];
            }
            return options;
        },

        bridgedOptions: function (get) {
            var interfaces = [];
            Ext.getStore('interfaces').each(function (interface) {
                // interface should be ADDRESSED
                if (interface.get('interfaceId') === get('record.interfaceId') ||
                    interface.get('configType') !== 'ADDRESSED') {
                        return;
                    }

                interfaces.push({
                    text: interface.get('name'),
                    value: interface.get('interfaceId')
                });
            });
            return interfaces;
        },

        enableIpv6Toggle: function (get) {
            return get('record.wan') && get('cardId') === 'ipv6';
        },

        enableDhcpToggle: function (get) {
            return !get('record.wan') && get('cardId') === 'dhcp';
        },

        enableVrrpToggle: function (get) {
            return get('cardId') === 'vrrp';
        },

        addGridItemsBtn: function (get) {
            return Ext.Array.contains(['ipv4-aliases', 'ipv6-aliases', 'vrrp-aliases', 'dhcp-options'], get('cardId'));
        },
    }

});
