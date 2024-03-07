"use strict";
/**
 * Generates a SQL UPDATE query string based on the provided parameters.
 *
 * @param table - The name of the table to update.
 * @param update_data - An object containing the data to update.
 * @param condition - The condition for updating the data.
 * @returns The generated SQL UPDATE query string.
 */
function genQueryUpdateSql(l) { var n, o, i = l.table, e = l.update_data, t = void 0 === e ? {} : e, d = l.condition, u = null === (o = null === (n = Object.entries(t)) || void 0 === n ? void 0 : n.map((function (l) { var n, o = null == l ? void 0 : l[0], i = "number" == typeof (null == l ? void 0 : l[1]) || "boolean" == typeof (null == l ? void 0 : l[1]), e = null == l ? void 0 : l[1], t = i ? null == l ? void 0 : l[1] : null == e ? void 0 : e.trim(), d = !i && (0 == (null == t ? void 0 : t.indexOf(o)) || (null == t ? void 0 : t.lastIndexOf(o)) == (null == t ? void 0 : t.length) - (null == o ? void 0 : o.length)); return o + "=" + (!i && (1 == (null === (n = null == t ? void 0 : t.match(/[+|-|\/|*]/gi)) || void 0 === n ? void 0 : n.length) && d) ? null == t ? void 0 : t.toString() : null === JSON || void 0 === JSON ? void 0 : JSON.stringify(t)) }))) || void 0 === o ? void 0 : o.join(","); return "UPDATE ".concat(i, " SET ").concat(u).concat(d ? " WHERE " + d + " " : "") } Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = genQueryUpdateSql;