/* eslint-disable class-methods-use-this */
const { isEmpty, cloneDeep } = require("lodash");
const { sequelize } = require("../index");
const { SORT_VALUE } = require("./constants");

class SortHandler {
  /**
   * Sort Validator.
   * @param {Array} sortableColumns - Sortable Columns.
   * @param {Object} sort - Applied Sort.
   * @param {boolean} multipleSort - Is Multiple Sort.
   */
  validate(sortableColumns, sort, multipleSort = false) {
    if (sort.constructor !== Object)
      throw new Error(`The sort value type is not an object`);

    if (isEmpty(sort)) return;

    const appliedSortColumns = Object.keys(sort);

    if (!multipleSort && appliedSortColumns.length > 1)
      throw new Error(`Sort will not be applied to multiple columns at a time`);

    for (let index = 0; index < appliedSortColumns.length; index += 1) {
      const appliedSortColumn = appliedSortColumns[index];
      if (appliedSortColumn && !sortableColumns.includes(appliedSortColumn))
        throw new Error(
          `Sort will not be applied across this column {column: ${appliedSortColumn}}`
        );

      const appliedSortColumnValue = sort[appliedSortColumn].toLowerCase();

      // Check that the value of the sort applied column is correct
      if (
        appliedSortColumn &&
        !Object.values(SORT_VALUE).includes(appliedSortColumnValue)
      )
        throw new Error(
          `Sort value must be 'asc' or' desc'. wrong value column name is '${appliedSortColumn}' and value is '${appliedSortColumnValue}'`
        );
    }
  }

  customOrder(column, values, direction) {
    let orderByClause = "CASE ";
    for (let index = 0; index < values.length; index += 1) {
      let value = values[index];
      if (typeof value === "string") value = `'${value}'`;
      orderByClause += `WHEN ${column} = ${value} THEN '${index}' `;
    }
    orderByClause += `ELSE ${column} END`;
    return [sequelize.literal(orderByClause), direction];
  }

  /**
   * Build Order Clause.
   * @param {Array} _sortColumnsMapping - Human readable to DB column name Mapping Object.
   * @param {Object} _customSortColumn - Custom sort Column.
   * @param {Object} _sort - Applied Sort.
   * @param {Array} _order - Order Clause.
   */
  buildOrderClause(_sortColumnsMapping, _customSortColumn, _sort, _order) {
    const sortColumnsMapping = _sortColumnsMapping
      ? cloneDeep(_sortColumnsMapping)
      : [];
    const customSortColumn = _customSortColumn
      ? cloneDeep(_customSortColumn)
      : {};
    const order = _order ? cloneDeep(_order) : [];
    const sort = cloneDeep(_sort);

    const appliedSortColumns = Object.keys(sort);

    for (let index = 0; index < appliedSortColumns.length; index += 1) {
      const appliedSortColumn = appliedSortColumns[index];
      const appliedSortValue = sort[appliedSortColumn];
      const dbColumnName =
        sortColumnsMapping[appliedSortColumn] || `"${appliedSortColumn}"`;

      if (customSortColumn[appliedSortColumn]) {
        order.push(
          this.customOrder(
            dbColumnName,
            customSortColumn[dbColumnName],
            appliedSortValue
          )
        );
        // eslint-disable-next-line no-continue
        continue;
      }
      order.push([sequelize.literal(dbColumnName), appliedSortValue]);
    }
    return order;
  }
}
module.exports = SortHandler;
