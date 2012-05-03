Ext.onReady(function() {
    Ext.define('Example.Component', {
        extend: 'Ext.Component',
        alias: 'widget.examplecomponent',
        styleHtmlContent: true,
        renderTpl: [
            '<tpl if="compHeader">', 
                '<h2 id="{id}-compHeader">{compHeader}</h2>', 
            '</tpl>', 
            '<p id="{id}-compContent">{compContent}</p>'
        ],
        childEls: ['compHeader', 'compContent']
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
                        compContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas, enim volutpat adipiscing semper, dui nibh laoreet dui, id cursus justo velit a augue. Fusce turpis mauris, ullamcorper et adipiscing in, dapibus at tellus. Sed egestas leo at dui facilisis vel porttitor lectus ultricies. Quisque nisi tortor, pretium eu rhoncus eu, fringilla quis neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut enim orci. Integer lobortis commodo turpis, consectetur porttitor nisl fermentum non. Nulla metus tortor, ornare eu suscipit sed, sodales nec sapien. In non velit id elit luctus porttitor. Nam elementum ultrices turpis nec auctor. Aenean eu enim dolor'
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
                        text: 'Load new Content',
                        handler: function() {
                            me.down('examplecomponent').compContent.load({
                                url: 'content.html',
                                success: function() {
                                    me.doComponentLayout();
                                }
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
