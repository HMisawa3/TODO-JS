import "./styles.css";

const onClickAdd = () => {
  // inputの値を取得
  const inputText = document.getElementById("addText").value;
  // inputのvalueを初期化
  document.getElementById("addText").value = "";
  // 未完了タスク追加関数実行
  createImcompleteList(inputText);
};

/**
 * 未完了タスク追加関数
 * @param text (TODO-title)
 */
const createImcompleteList = (text) => {
  // 未完了タスクに挿入するHTMLを作成
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.className = "list_row";
  const p = document.createElement("p");
  p.className = "record";
  p.innerText = text;

  // 完了ボタンの生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // removeする要素を取得
    const completeTarget = completeButton.parentNode.parentNode;
    // 完了にするTODO-titleを取得
    const completeTitle = completeTarget.querySelector(".record").innerText;

    // 完了タスクに挿入するHTMLを作成
    const comp_li = document.createElement("li");
    const comp_div = document.createElement("div");
    comp_div.className = "list_row";
    const comp_p = document.createElement("p");
    comp_p.className = "record";
    comp_p.innerText = completeTitle;

    // 戻すボタン
    const undoButton = document.createElement("button");
    undoButton.innerText = "戻す";
    undoButton.addEventListener("click", () => {
      const undoTarget = undoButton.parentNode.parentNode;
      document.getElementById("complete_records").removeChild(undoTarget);
      const completeTitle = undoTarget.querySelector(".record").innerText;
      createImcompleteList(completeTitle);
    });

    // 完了タスクに挿入するHTMLを成形し挿入
    comp_div.appendChild(comp_p);
    comp_div.appendChild(undoButton);
    comp_li.appendChild(comp_div);
    document.getElementById("complete_records").appendChild(comp_li);

    // 未完了タスクから削除
    deleteFromImcomplete(completeButton.parentNode.parentNode);
  });

  // 削除ボタンの生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 未完了タスクから削除
    deleteFromImcomplete(deleteButton.parentNode.parentNode);
  });

  // 未完了タスクに挿入するHTMLを成形し挿入
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);
  document.getElementById("records").appendChild(li);
};

/**
 * 未完了タスクから削除する関数
 * @param target (HTML)
 */
const deleteFromImcomplete = (target) => {
  document.getElementById("records").removeChild(target);
};

document
  .getElementById("addButton")
  .addEventListener("click", () => onClickAdd());

/**
 * origin patern HTML create
 */

// const html = `
//       <li>
//         <div class="list_row">
//           <p class="record">${inputText}</p>
//           <button>完了</button>
//           <button>削除</button>
//         </div>
//       </li>
// `;
// document.getElementById("records").insertAdjacentHTML("beforeend", html);
