const mariadb = require('./connect/mariadb'); // mariadb.js에서 내보낸 conn 객체 가져오기

/**
 * 데이터베이스에서 쿼리를 실행하는 함수
 * @param {string} query - 실행할 SQL 쿼리
 * @param {Array} params - 쿼리에 전달할 매개변수
 * @returns {Promise} - 쿼리 결과를 반환하는 Promise
 */
function executeQuery(query, params) {
    return new Promise(function(resolve, reject) {
        mariadb.query(query, params, function(error, results) {
            if (error) {
                console.error('Database query error:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    executeQuery: executeQuery
};