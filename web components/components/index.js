class MyComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        p {
          color: red;
        }
      </style>
      <p>Hello, Web Components!</p>
    `;
  }
}

class MyButtonComponent extends HTMLElement {
  constructor() {
    super();
    console.dir(this)
    const shadow = this.attachShadow({ mode: "open" })
    shadow.innerHTML = `
      <style>
        button {
          outline: none;
          border: none;
          background-color: #008c8c;
          color: #fff;
          border-radius: 5px;
          padding: 5px 15px;
          cursor: pointer;
        }

        button:hover {
          background-color: #00a3a3;
        }

        button:active {
          background-color: #006b6b;
        }

        
        button[disabled] {
          cursor: no-drop;
          background-color: #b3d9d9;
        }
      </style>
      <button>
        <slot>按钮默认文字</slot>
      </button>
    `;
  }

  // 返回使用时需要监听的属性
  static get observedAttributes () {
    return ['disabled']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'disabled') {
      if(newValue === "" || newValue === "disabled"){
        this.shadowRoot.querySelector('button').setAttribute("disabled", "disabled")
      }else{
        this.shadowRoot.querySelector('button').removeAttribute("disabled")
      }
    }
    console.log('name', name);
    console.log('oldValue', oldValue);
    console.log('newValue', newValue);
  }


}

customElements.define('my-component', MyComponent);
customElements.define('my-button', MyButtonComponent);