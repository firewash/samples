Ext.data.JsonP.KISSY_Editor_Selection({"tagname":"class","name":"KISSY.Editor.Selection","autodetected":{},"files":[{"filename":"selection.js","href":"selection.html#KISSY-Editor-Selection"}],"params":[{"tagname":"params","name":"document","doc":"<p>{Document} document of editor</p>\n"}],"members":[{"name":"getNative","tagname":"method","owner":"KISSY.Editor.Selection","id":"method-getNative","meta":{}},{"name":"getSelectedElement","tagname":"method","owner":"KISSY.Editor.Selection","id":"method-getSelectedElement","meta":{}},{"name":"getStartElement","tagname":"method","owner":"KISSY.Editor.Selection","id":"method-getStartElement","meta":{}},{"name":"getType","tagname":"method","owner":"KISSY.Editor.Selection","id":"method-getType","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-KISSY.Editor.Selection","short_doc":"selection normalizer class ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/selection.html#KISSY-Editor-Selection' target='_blank'>selection.js</a></div></pre><div class='doc-contents'><p>selection normalizer class</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>document</span> : <div class='sub-desc'><p>{Document} document of editor</p>\n</div></li></ul></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-getNative' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Editor.Selection'>KISSY.Editor.Selection</span><br/><a href='source/selection.html#KISSY-Editor-Selection-method-getNative' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Editor.Selection-method-getNative' class='name expandable'>getNative</a>( <span class='pre'></span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Gets the native selection object from the browser. ...</div><div class='long'><p>Gets the native selection object from the browser.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>The native selection object.</p>\n\n<pre><code> var selection = editor.getSelection().&lt;b&gt;getNative()&lt;/b&gt;;\n</code></pre>\n</div></li></ul></div></div></div><div id='method-getSelectedElement' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Editor.Selection'>KISSY.Editor.Selection</span><br/><a href='source/selection.html#KISSY-Editor-Selection-method-getSelectedElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Editor.Selection-method-getSelectedElement' class='name expandable'>getSelectedElement</a>( <span class='pre'></span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Gets the current selected element. ...</div><div class='long'><p>Gets the current selected element.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>The selected element. Null if no\n       selection is available or the selection type is not\n      SELECTION_ELEMENT.</p>\n\n<pre><code> var element = editor.getSelection().&lt;b&gt;getSelectedElement()&lt;/b&gt;;\n alert( element.nodeName() );\n</code></pre>\n</div></li></ul></div></div></div><div id='method-getStartElement' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Editor.Selection'>KISSY.Editor.Selection</span><br/><a href='source/selection.html#KISSY-Editor-Selection-method-getStartElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Editor.Selection-method-getStartElement' class='name expandable'>getStartElement</a>( <span class='pre'></span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Gets the Dom element in which the selection starts. ...</div><div class='long'><p>Gets the Dom element in which the selection starts.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>The element at the beginning of the\n       selection.</p>\n\n<pre><code> var element = editor.getSelection().&lt;b&gt;getStartElement()&lt;/b&gt;;\n     alert( element.nodeName() );\n</code></pre>\n</div></li></ul></div></div></div><div id='method-getType' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Editor.Selection'>KISSY.Editor.Selection</span><br/><a href='source/selection.html#KISSY-Editor-Selection-method-getType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Editor.Selection-method-getType' class='name expandable'>getType</a>( <span class='pre'></span> ) : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">number</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Gets the type of the current selection. ...</div><div class='long'><p>Gets the type of the current selection. The following values are\navailable:</p>\n\n<ul>\n       <li> SELECTION_NONE (1): No selection.</li>\n       <li> SELECTION_TEXT (2): Text is selected or\n           collapsed selection.</li>\n       <li> SELECTION_ELEMENT (3): A element\n           selection.</li>\n</ul>\n\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">number</a></span><div class='sub-desc'><p>One of the following constant values:\n        SELECTION_NONE,  SELECTION_TEXT or\n        SELECTION_ELEMENT.</p>\n\n<pre><code> if ( editor.getSelection().&lt;b&gt;getType()&lt;/b&gt; == SELECTION_TEXT )\n     alert( 'Text is selected' );\n</code></pre>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});