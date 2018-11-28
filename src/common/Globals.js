Ext.define('Mfw.Globals', {
    alternateClassName: 'Globals',
    singleton: true,

    protocols: [
        { name: 'HOPOPT' },
        { name: 'ICMP' },
        { name: 'IGMP' },
        { name: 'GGP' },
        { name: 'IP-in-IP' },
        { name: 'ST' },
        { name: 'TCP' },
        { name: 'CBT' },
        { name: 'EGP' },
        { name: 'IGP' },
        { name: 'BBN-RCC-MON' },
        { name: 'NVP-II' },
        { name: 'PUP' },
        { name: 'ARGUS' },
        { name: 'EMCON' },
        { name: 'XNET' },
        { name: 'CHAOS' },
        { name: 'UDP' },
        { name: 'MUX' },
        { name: 'DCN-MEAS' },
        { name: 'HMP' },
        { name: 'PRM' },
        { name: 'XNS-IDP' },
        { name: 'TRUNK-1' },
        { name: 'TRUNK-2' },
        { name: 'LEAF-1' },
        { name: 'LEAF-2' },
        { name: 'RDP' },
        { name: 'IRTP' },
        { name: 'ISO-TP4' },
        { name: 'NETBLT' },
        { name: 'MFE-NSP' },
        { name: 'MERIT-INP' },
        { name: 'DCCP' },
        { name: '3PC' },
        { name: 'IDPR' },
        { name: 'XTP' },
        { name: 'DDP' },
        { name: 'IDPR-CMTP' },
        { name: 'TP++' },
        { name: 'IL' },
        { name: 'IPv6' },
        { name: 'SDRP' },
        { name: 'IPv6-Route' },
        { name: 'IPv6-Frag' },
        { name: 'IDRP' },
        { name: 'RSVP' },
        { name: 'GRE' },
        { name: 'MHRP' },
        { name: 'BNA' },
        { name: 'ESP' },
        { name: 'AH' },
        { name: 'I-NLSP' },
        { name: 'SWIPE' },
        { name: 'NARP' },
        { name: 'MOBILE' },
        { name: 'TLSP' },
        { name: 'SKIP' },
        { name: 'IPv6-ICMP' },
        { name: 'IPv6-NoNxt' },
        { name: 'IPv6-Opts' },
        { name: 'CFTP' },
        { name: 'SAT-EXPAK' },
        { name: 'KRYPTOLAN' },
        { name: 'RVD' },
        { name: 'IPPC' },
        { name: 'SAT-MON' },
        { name: 'VISA' },
        { name: 'IPCU' },
        { name: 'CPNX' },
        { name: 'CPHB' },
        { name: 'WSN' },
        { name: 'PVP' },
        { name: 'BR-SAT-MON' },
        { name: 'SUN-ND' },
        { name: 'WB-MON' },
        { name: 'WB-EXPAK' },
        { name: 'ISO-IP' },
        { name: 'VMTP' },
        { name: 'SECURE-VMTP' },
        { name: 'VINES' },
        { name: 'TTP' },
        { name: 'NSFNET-IGP' },
        { name: 'DGP' },
        { name: 'TCF' },
        { name: 'EIGRP' },
        { name: 'OSPF' },
        { name: 'Sprite-RPC' },
        { name: 'LARP' },
        { name: 'MTP' },
        { name: 'AX.25' },
        { name: 'IPIP' },
        { name: 'MICP' },
        { name: 'SCC-SP' },
        { name: 'ETHERIP' },
        { name: 'ENCAP' },
        { name: 'GMTP' },
        { name: 'IFMP' },
        { name: 'PNNI' },
        { name: 'PIM' },
        { name: 'ARIS' },
        { name: 'SCPS' },
        { name: 'QNX' },
        { name: 'A/N' },
        { name: 'IPComp' },
        { name: 'SNP' },
        { name: 'Compaq-Peer' },
        { name: 'IPX-in-IP' },
        { name: 'VRRP' },
        { name: 'PGM' },
        { name: 'L2TP' },
        { name: 'DDX' },
        { name: 'IATP' },
        { name: 'STP' },
        { name: 'SRP' },
        { name: 'UTI' },
        { name: 'SMP' },
        { name: 'SM' },
        { name: 'PTP' },
        { name: 'IS-IS' },
        { name: 'FIRE' },
        { name: 'CRTP' },
        { name: 'CRUDP' },
        { name: 'SSCOPMCE' },
        { name: 'IPLT' },
        { name: 'SPS' },
        { name: 'PIPE' },
        { name: 'SCTP' },
        { name: 'FC' },
        { name: 'RSVP-E2E-IGNORE' },
        { name: 'Mobility' },
        { name: 'UDPLite' },
        { name: 'MPLS-in-IP' },
        { name: 'manet' },
        { name: 'HIP' },
        { name: 'Shim6' },
        { name: 'WESP' },
        { name: 'ROHC' }
    ],

    prefixes: [
        { value: 32, text: '/32 - 255.255.255.255' },
        { value: 31, text: '/31 - 255.255.255.254' },
        { value: 30, text: '/30 - 255.255.255.252' },
        { value: 29, text: '/29 - 255.255.255.248' },
        { value: 28, text: '/28 - 255.255.255.240' },
        { value: 27, text: '/27 - 255.255.255.224' },
        { value: 26, text: '/26 - 255.255.255.192' },
        { value: 25, text: '/25 - 255.255.255.128' },
        { value: 24, text: '/24 - 255.255.255.0' },
        { value: 23, text: '/23 - 255.255.254.0' },
        { value: 22, text: '/22 - 255.255.252.0' },
        { value: 21, text: '/21 - 255.255.248.0' },
        { value: 20, text: '/20 - 255.255.240.0' },
        { value: 19, text: '/19 - 255.255.224.0' },
        { value: 18, text: '/18 - 255.255.192.0' },
        { value: 17, text: '/17 - 255.255.128.0' },
        { value: 16, text: '/16 - 255.255.0.0' },
        { value: 15, text: '/15 - 255.254.0.0' },
        { value: 14, text: '/14 - 255.252.0.0' },
        { value: 13, text: '/13 - 255.248.0.0' },
        { value: 12, text: '/12 - 255.240.0.0' },
        { value: 11, text: '/11 - 255.224.0.0' },
        { value: 10, text: '/10 - 255.192.0.0' },
        { value: 9, text: '/9 - 255.128.0.0' },
        { value: 8, text: '/8 - 255.0.0.0' },
        { value: 7, text: '/7 - 254.0.0.0' },
        { value: 6, text: '/6 - 252.0.0.0' },
        { value: 5, text: '/5 - 248.0.0.0' },
        { value: 4, text: '/4 - 240.0.0.0' },
        { value: 3, text: '/3 - 224.0.0.0' },
        { value: 2, text: '/2 - 192.0.0.0' },
        { value: 1, text: '/1 - 128.0.0.0' },
        { value: 0, text: '/0 - 0.0.0.0' }
    ],

    conditionFields: [
        { text: 'Username'.t(),    value: 'username' },
        { text: 'Protocol'.t(),    value: 'protocol' },
        { text: 'Hostname'.t(),    value: 'hostname' },
        { text: 'Client'.t(),      value: 'c_client_addr' },
        { text: 'Server'.t(),      value: 's_server_addr' },
        { text: 'Server Port'.t(), value: 's_server_port' },
    ],

    operators: [
        { text: 'equals [=]'.t(),            value: '=',        id: 'EQ' },
        { text: 'not equals [!=]'.t(),       value: '!=',       id: 'NE' },
        { text: 'greater than [>]'.t(),      value: '>',        id: 'GT' },
        { text: 'less than [<]'.t(),         value: '<',        id: 'LT' },
        { text: 'greater or equal [>=]'.t(), value: '>=',       id: 'GE' },
        { text: 'less or equal [<=]'.t(),    value: '<=',       id: 'LE'},
        { text: 'like'.t(),                  value: 'like',     id: 'LIKE' },
        { text: 'not like'.t(),              value: 'not like', id: 'NOT_LIKE' },
        { text: 'is'.t(),                    value: 'is',       id: 'IS' },
        { text: 'is not'.t(),                value: 'is not',   id: 'IS_NOT' },
        { text: 'in'.t(),                    value: 'in',       id: 'IN' },
        { text: 'not in'.t(),                value: 'not in',   id: 'NOT_IN' }
    ],

    constructor: function() {
        this.initConfig({
            operatorsMap: Ext.Array.toValueMap(this.operators, 'id'),
            prefixesMap: Ext.Array.toValueMap(this.prefixes, 'value')
            // columns: columns
        });
    }


});
