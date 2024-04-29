import './App.css';
import Item from "./Component/Item";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

import 'react-accessible-accordion/dist/fancy-example.css';
function App() {

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div>
      </nav>
         {/* {value === 'suit' ? (
                    <div className='input-group flex-nowrap my-2'>
                        <span className="input-group-text" id="addon-wrapping">Suit</span>
                        <select value={suitName} onChange={(e) => setSuitName(e.target.value)} className="form-select" aria-label="Default select example">
                            <option >Shawl collar</option>
                            <option>D B</option>
                            <option>S B</option>
                            <option>Prince</option>
                            <option>Three piece</option>
                            <option>coat/blazer</option>
                        </select>
                        <select value={suits} onChange={(e) => { setSuits(e.target.value) }} className="suit-selected form-select " aria-label="Default select example">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                        <input style={{ width: "100px" }} value={suitsOrder} onChange={(e) => setSuitsOrder(e.target.value)} type="text" className="form-control" placeholder="Order no. suits" aria-label="Enter here" aria-describedby="addon-wrapping" />
                    </div>
                ) : null}
                {value === 'sadri' ? (
                    <div className='input-group flex-nowrap my-2'>
                        <span className="input-group-text" id="addon-wrapping">Sadri</span>
                        <select value={sadri} onChange={(e) => { setSadri(e.target.value) }} className="suit-selected form-select " aria-label="Default select example">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                        <input style={{ width: "100px" }} value={sadriOrder} onChange={(e) => setSadriOrder(e.target.value)} type="number" className="form-control" placeholder="Order no. sadri" aria-label="Enter here" aria-describedby="addon-wrapping" />
                    </div>
                ) : null} */}
                {/* {value === 'shirt' ? (
                    <div className="input-group flex-nowrap my-2 " >
                        <span className="input-group-text" id="addon-wrapping"> Shirts</span>
                        <input style={{ width: "100px" }} value={shirts} onChange={(e) => setShirts(e.target.value)} type="number" className="form-control" placeholder="no. of shirts" aria-label="First Name" aria-describedby="addon-wrapping" />
                        <select value={shirts} onChange={(e) => { setShirts(e.target.value) }} className="suit-selected form-select " aria-label="Default select example">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                        <input style={{ width: "100px" }} value={shirtsOrder} onChange={(e) => setShirtsOrder(e.target.value)} type="number" className="form-control" placeholder="Order no. shirts" aria-label="Last Name" aria-describedby="addon-wrapping" />
                    </div>
                ) : null} */}
                {/* {value === 'pants' ? (
                    <div className="input-group flex-nowrap my-2">
                        <span className="input-group-text" id="addon-wrapping">Pants</span>
                        <input style={{ width: "100px" }} value={pants} onChange={(e) => setPants(e.target.value)} type="number" className="form-control" placeholder="no. of pants" aria-label="Enter here" aria-describedby="addon-wrapping" />
                        <select value={pants} onChange={(e) => { setPants(e.target.value) }} className="suit-selected form-select " aria-label="Default select example">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                        <input style={{ width: "100px" }} value={pantsOrder} onChange={(e) => setPantsOrder(e.target.value)} type="number" className="form-control" placeholder="Order no.pants" aria-label="Enter here" aria-describedby="addon-wrapping" />
                    </div>
                ) : null} */}
                {/* {value === 'waiscoat' ? (
                    <div className="input-group flex-nowrap my-2">
                        <span className="input-group-text" id="addon-wrapping">waiscoats</span>
                        <input style={{ width: "100px" }} value={waiscoat} onChange={(e) => setWaiscoat(e.target.value)} type="number" className="form-control" placeholder="no. of waiscoat" aria-label="Enter here" aria-describedby="addon-wrapping" />
                        <select value={waiscoat} onChange={(e) => { setWaiscoat(e.target.value) }} className="suit-selected form-select " aria-label="Default select example">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                        <input style={{ width: "100px" }} value={waiscoatOrder} onChange={(e) => setWaiscoatOrder(e.target.value)} type="number" className="form-control" placeholder="Order no. waiscoat" aria-label="Enter here" aria-describedby="addon-wrapping" />
                    </div>
                ) : null} */}
      <Item />
    </div>
  );
}

export default App;
