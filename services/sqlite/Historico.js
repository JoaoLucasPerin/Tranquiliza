import db from "./SQLiteDatabse";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  //tx.executeSql("DROP TABLE historico;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS historico (id INTEGER PRIMARY KEY AUTOINCREMENT, atividade INT, modo INT, data TEXT, hora INT, minuto INT, segundo INT);"
  );
});
// https://stackoverflow.com/questions/54531206/how-do-i-get-time-in-react-native // horarios podem ser pegos do campo date pelo getHours.. etc
// 1. terminar os com modo interativo e modo não interativo:
  // atividade 1 FALTA um não interativo (OK +- - fiz um semi-interativo, acho que esse é o melhor modo)
  // atividade 2 FALTA um interativo (deixarei para a mvp2. Acho que o não interativo é o melhor)
// 2. terminar o cadastro de historico - SQLITE (agora)
// inserir modo INT - que vai ser 1 e 2
// 3. notification:
  // evitar a ansiedade -> notificacao da hora mais frequente das ansiedade para largar mensagem para evitar ansiedade.
// 4. sons:
  // adicionar algum som, de mar, ou algo do tipo - sons tranquilizantes.
  // quando errar, da um barulho
// 5. detalhes:
  // tamanho da fonte na atividade 1, ir até zero e perguntar se quer jogar de novo. Ou no modo 2, reiniciar automaticamente..

/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
// Removendo diretorio node_modules pelo windows:
// rmdir node_modules /s /q 
// upando pro git:
// git init
// git status
// git add . 
// git commit -m "atualizado 09/12/2021"
// git remote add origin https://github.com/JoaoLucasPerin/Tranquiliza.git
// git push -u origin master

const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "INSERT INTO historico (atividade, modo, data, hora, minuto, segundo) values (?, ?, ?, ?, ?, ?);",
        [obj.atividade, obj.modo, obj.data, obj.hora, obj.minuto, obj.segundo],
        //-----------------------
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * ATUALIZA UM REGISTRO JÁ EXISTENTE
 * - Recebe o ID do registro e um OBJETO com valores atualizados;
 * - Retorna uma Promise:
 *  - O resultado da Promise é a quantidade de registros atualizados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const update = (id, obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "UPDATE historico SET atividade=?, modo=?, data=?, hora=?, minuto=?, segundo=?, WHERE id=?;",
        [obj.atividade, obj.modo, obj.data, obj.hora, obj.minuto, obj.segundo, id],
        //-----------------------
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id); // nenhum registro alterado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * BUSCA UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o objeto (caso exista);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const find = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM historico WHERE id=?;",
        [id],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Obj not found: id=" + id); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * BUSCA UM REGISTRO POR MEIO DA ATIVIDADE (atividade)
 * - Recebe a marca do carro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findByAtividade = (atividade) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM historico WHERE atividade = ?;",
        [atividade],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Obj not found: atividade=" + atividade); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existam registros.
 */
const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM historico;",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * REMOVE UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM historico WHERE id=?;",
        [id],
        //-----------------------
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

const removeDataVazia = (data) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM historico WHERE data=?;",
        [data],
        //-----------------------
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

const retornaHoraNotificacao = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT hora FROM historico GROUP BY hora ORDER BY COUNT(*) DESC LIMIT 1",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

export default {
  create,
  update,
  find,
  findByAtividade,
  all,
  remove,
  removeDataVazia,
  retornaHoraNotificacao,
};
