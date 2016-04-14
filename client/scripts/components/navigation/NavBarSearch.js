const NavBarSearch = () => {
  return (
    <form className='navbar-form navbar-left' role='search'>
      <div className='form-group'>
        <input className='form-control' placeholder='Search' type='text'/>
      </div>
      <button className='btn btn-default' type='submit'>Submit</button>
    </form>
  );
};

export default NavBarSearch;
