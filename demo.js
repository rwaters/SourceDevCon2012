Ext.onReady(function() {
    Ext.define('Example.Component',{
        extend: 'Ext.Component',
        styleHtmlContent: true,
        renderTpl: [
            '<tpl if="compHeader">',
                '<h2>{compHeader}</h2>',
            '</tpl>',
            '<p>{compContent}</p>'
        ]
    });

    Ext.create('Example.Component', {
        renderTo: document.body,
        renderData: {
            // compHeader: 'Component Header!',
            compContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas, enim volutpat adipiscing semper, dui nibh laoreet dui, id cursus justo velit a augue. Fusce turpis mauris, ullamcorper et adipiscing in, dapibus at tellus. Sed egestas leo at dui facilisis vel porttitor lectus ultricies. Quisque nisi tortor, pretium eu rhoncus eu, fringilla quis neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut enim orci. Integer lobortis commodo turpis, consectetur porttitor nisl fermentum non. Nulla metus tortor, ornare eu suscipit sed, sodales nec sapien. In non velit id elit luctus porttitor. Nam elementum ultrices turpis nec auctor. Aenean eu enim dolor'
        }
    });
});
