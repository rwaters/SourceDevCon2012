Ext.define('Ext.ux.grid.column.MultiSortTemplateColumn', {
    extend: 'Ext.grid.column.Template',
    alias: 'widget.multisorttemplatecolumn',

    /** Customized template column to support multiple headers where each can still click to sort.
     *  now expects the text property to be an array of objects:
     *  text: [{
     *      name: 'Header 1',
     *      dataIndex: 'field1'
     *  }, {
     *      name: 'Header 2',
     *      dataIndex: 'field2'
     *  }]
     */
    initComponent: function() {
        var me = this;
        me.renderTpl = [
            '<div id="{id}-titleEl" class="' + Ext.baseCSSPrefix + 'column-header-inner">', 
                '<tpl for="text">', 
                    '<span class="', 
                    '<tpl if="this.getDataIndex()==dataIndex">', 
                        Ext.baseCSSPrefix + 'column-header-text', 
                    '</tpl>', 
                    ' column-sort-text', 
                    '<tpl if="extraCls">', 
                        ' {extraCls}', 
                    '</tpl>', 
                    '" sortOn="{dataIndex}">', 
                        '{name}', 
                    '</span><br/>', 
                '</tpl>', 
                '<tpl if="!values.menuDisabled">',
                    '<div class="' + Ext.baseCSSPrefix + 'column-header-trigger"></div>',
                '</tpl>', 
            '</div>',
            '{%this.renderContainer(out,values)%}',
        {
            getDataIndex: function() {
                return me.dataIndex;
            }
        }];


        me.callParent();

        me.removeChildEls(function(childEl) {
            return childEl == 'textEl';
        });
        me.addChildEls({
            name: 'textEl',
            select: '.' + Ext.baseCSSPrefix + 'column-header-text'
        });
    },

    onElClick: function(e, t) {
        // The grid's docked HeaderContainer.
        var me            = this,
            ownerHeaderCt = me.getOwnerHeaderCt();

        if (ownerHeaderCt && !ownerHeaderCt.ddLock) {
            // Firefox doesn't check the current target in a within check.
            // Therefore we check the target directly and then within (ancestors)
            if (me.triggerEl && (e.target === me.triggerEl.dom || t === me.triggerEl.dom || e.within(me.triggerEl))) {
                ownerHeaderCt.onHeaderTriggerClick(me, e, t);
                // if its not on the left hand edge, sort
            } else if (e.getKey() || (!me.isOnLeftEdge(e) && !me.isOnRightEdge(e))) {

                var sort = e.getTarget('span.column-sort-text');
                if (sort) {
                    me.dataIndex = sort.attributes.sortOn.value;
                    Ext.fly(sort).radioCls(Ext.baseCSSPrefix + 'column-header-text');
                }

                me.toggleSortState();
                ownerHeaderCt.onHeaderClick(me, e, t);
            }
        }
    },

    setPadding: function(headerHeight) {
        var me = this,
            lineHeight = parseInt(me.textEl.getStyle('line-height'), 10),
            // textHeight = me.textEl.dom.offsetHeight,
            titleEl = me.titleEl,
            availableHeight = headerHeight - me.el.getBorderWidth('tb'),
            titleElHeight;

        // Top title containing element must stretch to match height of sibling group headers
        if (!me.isGroupHeader) {
            if (titleEl.getHeight() < availableHeight) {
                titleEl.setHeight(availableHeight);
                // the column el's parent element (the 'innerCt') may have an incorrect height
                // at this point because it may have been shrink wrapped prior to the titleEl's
                // height being set, so we need to sync it up here
                me.ownerCt.layout.innerCt.setHeight(headerHeight);
            }
        }
        titleElHeight = titleEl.getViewSize().height;

        // Vertically center the header text in potentially vertically stretched header
        // if (textHeight) {
        //     if(lineHeight) {
        //         textHeight = Math.ceil(textHeight / lineHeight) * lineHeight;
        //     }
        //     titleEl.setStyle({
        //         paddingTop: Math.floor(Math.max(((titleElHeight - textHeight) / 2), 0)) + 'px'
        //     });
        // }

        // Only IE needs this
        if (Ext.isIE && me.triggerEl) {
            me.triggerEl.setHeight(titleElHeight);
        }
    }
});
