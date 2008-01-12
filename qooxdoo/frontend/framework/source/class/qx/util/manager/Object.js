/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/* ************************************************************************


************************************************************************ */

/**
 * Generic object registry.
 *
 * Stores a collection of generic JavaScript objects into a registry.
 * The registered objects can be retrieved by their qooxdoo hash code
 * returned by {@link qx.core.Object.toHashCode}.
 */
qx.Class.define("qx.util.manager.Object",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this._objects = {};
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Add an object node
     *
     * @param obj {Element} Object to add
     * @return {Integer} Hash code of the object
     */
    add : function(vObject)
    {
      if (this.getDisposed()) {
        return;
      }
      var hash = qx.core.Object.toHashCode(vObject);
      this._objects[hash] = vObject;
      return hash;
    },


    /**
     * Remove the object from the registry
     *
     * @param obj {Object} Object to remove
     */
    remove : function(vObject)
    {
      if (this.getDisposed()) {
        return false;
      }

      var hash = qx.core.Object.toHashCode(vObject);
      delete this._objects[hash];
    },


    /**
     * Whether the given object is in the registry.
     *
     * @param obj {Object} Object to check
     */
    has : function(vObject) {
      var hash = qx.core.Object.toHashCode(vObject);
      return this._objects[hash] !== undefined;
    },


    /**
     * TODOC
     *
     * @type member
     * @param vObject {var} TODOC
     * @return {var} TODOC
     */
    get : function(vObject) {
      var hash = qx.core.Object.toHashCode(vObject);
      return this._objects[hash];
    },


    /**
     * Get an object by its qooxdoo hash value. The object must be added
     * before using {@link #add}.
     *
     * @param hash {Integer} qooxdoo hash value of the object
     * @return {Object|undefined} The registered object or undefined if the
     *   object is not registered.
     */
    getByHash : function(hash) {
      return this._objects[hash];
    },


    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getAll : function() {
      return this._objects;
    },


    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    enableAll : function()
    {
      for (var vHashCode in this._objects) {
        this._objects[vHashCode].setEnabled(true);
      }
    },


    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    disableAll : function()
    {
      for (var vHashCode in this._objects) {
        this._objects[vHashCode].setEnabled(false);
      }
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
     this._disposeObjectDeep("_objects");
  }
});
