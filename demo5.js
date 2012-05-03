Ext.onReady(function() {
    Ext.define('Example.Component', {
        extend: 'Ext.Component',
        alias: 'widget.examplecomponent',
        styleHtmlContent: true,
        renderTpl: [
            '<tpl if="compHeader">', 
                '<h2 id="{id}-compHeader">{compHeader}</h2>', 
            '</tpl>',
            '<tpl if="compList">',
                '<ul id="{id}-compList">',
                    '<tpl for="compList">',
                        '<li class="list-item">{.}</li>',
                    '</tpl>',
                '</ul>',
            '</tpl>'
        ],
        childEls: [
            'compHeader', 
            'compList',
            {
                name: 'listItems',
                select: '.list-item'
            }
        ],

        afterRender: function() {
            var me = this;
            me.callParent(arguments);

            me.attachListListeners();

            if (me.renderData.compHeader) {
                me.attachHeaderEditor();
            }
        },

        attachListListeners: function() {
            var me = this;

            // Bad Idea - creates 1 DOM event listener per LI
            me.mon(me.listItems, 'click', me.onLiClick, me);

            // Better Approach
            // me.mon(me.getEl(), 'click', me.onLiClick, me, { delegate: '.list-item' });
        },

        onLiClick: function(event, target) {
            console.log('click', event, target);
        },

        attachHeaderEditor: function() {
            var me = this;
            me.headerEditor = Ext.create('Ext.Editor',{
                updateEl: true,
                alignment: 'tl-tl',
                field: {
                    width: 300,
                    xtype: 'textfield'
                }
            });

            me.mon(me.compHeader, 'dblclick', function() {
                me.headerEditor.startEdit(me.compHeader);
            });
        }
    });


    Ext.define('Example.Panel',{
        extend: 'Ext.panel.Panel',

        count: 0,

        initComponent: function() {
            var me = this;

            Ext.apply(me, {
                items: [{
                    xtype: 'examplecomponent',
                    renderData: {
                        compHeader: 'Component Header!',
                        compList: [
                            'Item 1',
                            'Item 2',
                            'Item 3',
                            'Item 4'
                        ]
                    }
                },{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                        text: 'Update Header',
                        handler: function() {
                            me.down('examplecomponent').compHeader.update('Foo: ' + (++me.count));
                        }
                    },{
                        text: 'Toggle Class on List items',
                        handler: function() {
                            me.down('examplecomponent').listItems.toggleCls('highlight');
                        }
                    },{
                        text: 'Loop through List Items',
                        handler: function() {
                            me.down('examplecomponent').listItems.each(function(li) {
                                console.log(li.$className, li,  li.dom);
                            });
                        }
                    }]
                }]
            });

            me.callParent();
        }
    });


    Ext.create('Example.Panel',{
        renderTo: document.body
    });
});
