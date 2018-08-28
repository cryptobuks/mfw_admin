/**
 * MasterGrid controller
 * Methods can be overridden by child controllers extending this
 */
Ext.define('Mfw.cmp.grid.MasterGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mastergrid',

    onInitialize: function (g) {
        var titleBar = g.getTitleBar(),
            toolbarActions = [],
            actionsColumn;

        // add status column
        g.insertColumn(0, {
            width: 5,
            minWidth: 5,
            sortable: false,
            hideable: false,
            menuDisabled: true,
            cell: {
                userCls: 'x-statuscolumn'
            },
            renderer: function (value, record, dataIndex, cell) {
                cell.setUserCls('');
                if (record.isDirty()) {
                    cell.setUserCls('status-dirty');
                }
                if (record.get('_deleteSchedule')) {
                    cell.setUserCls('status-delete');
                }
                if (record.phantom) {
                    cell.setUserCls('status-phantom');
                }
            }
        });

        if (g.getEnableCopy() || g.getEnableEdit() || g.getEnableDelete()) {
            actionsColumn = {
                text: 'Actions'.t(),
                align: 'center',
                sortable: false,
                hideable: false,
                cell: {
                    xtype: 'widgetcell',
                    widget: {
                        xtype: 'container',
                        items: [],
                        bind: {
                            record: '{record}'
                        }
                    },
                }
            };

            if (g.getEnableCopy()) {
                actionsColumn.cell.widget.items.push({
                    xtype: 'tool',
                    margin: '0 5',
                    iconCls: 'x-fa fa-files-o',
                    handler: 'onCopyRecord',
                    hidden: true,
                    bind: { hidden: '{record._deleteSchedule}' }
                })
            }

            if (g.getEnableEdit()) {
                actionsColumn.cell.widget.items.push({
                    xtype: 'tool',
                    margin: '0 5',
                    iconCls: 'x-fa fa-pencil',
                    handler: 'onEditRecord',
                    hidden: true,
                    bind: { hidden: '{record._deleteSchedule}' }
                })
            }

            if (g.getEnableDelete()) {
                actionsColumn.cell.widget.items.push({
                    xtype: 'tool',
                    margin: '0 5',
                    iconCls: 'x-fa fa-trash',
                    handler: function (cmp) {
                        if (cmp.getRecord().phantom) {
                            cmp.getRecord().drop();
                            return;
                        }
                        cmp.getRecord().set('_deleteSchedule', true);
                        // cmp.up('gridrow').setUserCls('x-removed');
                    },
                    hidden: true,
                    bind: {
                        hidden: '{record._deleteSchedule}',
                        disabled: Ext.isString(g.getEnableDelete()) ? g.getEnableDelete() : false
                    }
                });
                actionsColumn.cell.widget.items.push({
                    xtype: 'button',
                    text: 'Undo'.t(),
                    iconCls: 'x-fa fa-trash',
                    iconAlign: 'right',
                    handler: function (btn) {
                        btn.up('container').getRecord().set('_deleteSchedule', false);
                        // tn.up('gridrow').setUserCls('');
                    },
                    hidden: true,
                    bind: { hidden: '{!record._deleteSchedule}' }
                });
            }
            g.addColumn(actionsColumn);
        }


        if (g.getEnableManualSort()) {
            // g.setSortable(false);
            toolbarActions.push({
                xtype: 'segmentedbutton',
                allowToggle: false,
                align: 'right',
                hidden: true,
                bind: {
                    hidden: '{selcount !== 1}'
                },
                defaults: {
                    // ui: 'default',
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
                }]
            })
        }

        if (g.getEnableAdd()) {
            toolbarActions.push({
                // text: 'Add'.t(),
                iconCls: 'x-fa fa-plus-circle',
                align: 'right',
                tooltip: 'Some test',
                handler: 'onAddRecord'
            })
        }

        if (g.getEnableImport()) {
            toolbarActions.push({
                // text: 'Import'.t(),
                iconCls: 'x-fa fa-download',
                align: 'right',
                handler: 'onImport'
            })
        }

        if (g.getEnableExport()) {
            toolbarActions.push({
                // text: 'Export'.t(),
                iconCls: 'x-fa fa-upload',
                align: 'right',
                handler: 'onExport'
            })
        }

        if (g.getEnableReload()) {
            toolbarActions.push({
                // text: 'Reload'.t(),
                iconCls: 'x-fa fa-refresh',
                align: 'right',
                handler: 'onLoad'
            })
        }

        toolbarActions.push({
            text: 'Save'.t(),
            iconCls: 'x-fa fa-floppy-o',
            align: 'right',
            handler: 'onSync'
        })

        if (toolbarActions.length > 0) {
            titleBar.add(toolbarActions);
        }

        this.onLoad();
    },

    onLoad: function () {
        this.getView().getStore().load({
            success: function () {
                console.log('success');
            },
            failure: function () {}
        });
    },

    onSync: function () {
        this.getView().getStore().each(function (record) {
            if (record.get('_deleteSchedule')) {
                record.drop();
            }
            record.dirty = true; // to push all non-dropped records
            record.phantom = false; // to push new records
        });
        this.getView().getStore().sync({
            success: function () {
                Ext.toast('Settings saved!');
            }
        });
    },

    onAddRecord: function () {
        var me = this,
            newRecord = Ext.create(me.getView().getNewRecordModel());
        if (!me.dialog) {
            me.dialog = Ext.Viewport.add({
                xtype: me.getView().getEditorDialog(),
                isNewRecord: true,
                ownerCmp: me.getView()
            });
        }
        // info.record.getValidation()
        me.dialog.isNewRecord = true;
        me.dialog.getViewModel().set('rec', newRecord);
        me.dialog.show();
    },

    onEditRecord: function (cmp) {
        var me = this;
        if (!me.dialog) {
            me.dialog = Ext.Viewport.add({
                xtype: me.getView().getEditorDialog(),
                // xtype: 'masterdialog',
                isNewRecord: false,
                ownerCmp: me.getView()
            });
        }
        // info.record.getValidation()
        me.dialog.isNewRecord = false;
        me.dialog.getViewModel().set('rec', cmp.getRecord());
        me.dialog.show();
    },

    onCopyRecord: function (cmp) {
        var me = this,
            copiedRecord = cmp.getRecord().clone();

        copiedRecord.phantom = true;
        copiedRecord.dirty = false;
        if (!me.dialog) {
            me.dialog = Ext.Viewport.add({
                xtype: me.getView().getEditorDialog(),
                // xtype: 'masterdialog',
                isNewRecord: true,
                ownerCmp: me.getView()
            });
        }
        me.dialog.isNewRecord = true;
        me.dialog.getViewModel().set('rec', copiedRecord);
        me.dialog.show();
    },

    onSelect: function (grid, selected) {
        grid.getViewModel().set('selcount', selected.length);
    },

    onSort: function (btn) {
        // var grid = this;
        var store = this.getView().getStore(),
        record = this.getView().getSelection(),
        oldIndex = store.indexOf(record),
        newIndex, pos;
        switch (btn.pos) {
            case 'first': newIndex = 0; break;
            case 'up':    newIndex = oldIndex > 0 ? (oldIndex - 1) : oldIndex; break;
            case 'down':  newIndex = oldIndex < store.getCount() ? (oldIndex + 1) : oldIndex; break;
            case 'last':  newIndex = store.getCount(); break;
            default: break;
        }
        store.removeAt(oldIndex);
        store.insert(newIndex, record);
        store.sync();

        if (store.indexOf(record) === 0) { pos = 'first'; }
        if (store.indexOf(record) === store.getCount() - 1) { pos = 'last'; }

        this.getView().setSelection(record);
        this.getViewModel().set('pos', pos);
    },

    onImport: function () {
        Ext.toast('open import dialog');
    },

    onExport: function () {
        Ext.toast('open export dialog');
    }

});