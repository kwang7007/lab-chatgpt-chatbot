const KEY = 'todo-items'
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
function save(items){localStorage.setItem(KEY,JSON.stringify(items))}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function render(){const list=document.getElementById('list');list.innerHTML='';const items=load();items.forEach(it=>{const li=document.createElement('li');li.className=it.done?'done':'';const left=document.createElement('div');left.className='item-left';const chk=document.createElement('input');chk.type='checkbox';chk.checked=it.done;chk.addEventListener('change',()=>{toggle(it.id)});const span=document.createElement('span');span.textContent=it.text;left.appendChild(chk);left.appendChild(span);const actions=document.createElement('div');actions.className='item-actions';const del=document.createElement('button');del.textContent='삭제';del.addEventListener('click',()=>{remove(it.id)});actions.appendChild(del);li.appendChild(left);li.appendChild(actions);list.appendChild(li)})}
function add(text){if(!text||!text.trim())return;const items=load();items.unshift({id:uid(),text:text.trim(),done:false});save(items);render()}
function toggle(id){const items=load();for(const it of items)if(it.id===id)it.done=!it.done;save(items);render()}
function remove(id){let items=load();items=items.filter(it=>it.id!==id);save(items);render()}
function clearCompleted(){let items=load();items=items.filter(it=>!it.done);save(items);render()}
function clearAll(){localStorage.removeItem(KEY);render()}
document.addEventListener('DOMContentLoaded',()=>{render();document.getElementById('addBtn').addEventListener('click',()=>{add(document.getElementById('newTodo').value);document.getElementById('newTodo').value='';document.getElementById('newTodo').focus()});document.getElementById('newTodo').addEventListener('keydown',e=>{if(e.key==='Enter'){add(e.target.value);e.target.value=''}});document.getElementById('clearCompleted').addEventListener('click',clearCompleted);document.getElementById('clearAll').addEventListener('click',clearAll)})
