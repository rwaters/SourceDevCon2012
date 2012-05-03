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

    Ext.define('Example.model.Dummy', {
        extend: 'Ext.data.Model',
        fields: ['compHeader', 'compContent'],
        proxy: {
            type: 'ajax',
            url: 'dummy.json'
        }
    });
    var dummyModel = Ext.ModelManager.getModel('Example.model.Dummy').load(1,{
        success: function(model) {
            Ext.create('Example.Component',{
                renderTo: document.body,
                renderData: model.data
            });
        }
    });

});
