import { useState } from 'react';
import { useSearchStr } from '../lib/useSearchStr'; 
const SearchForm = ({onSearch}) => {
    const [searchStr, setSearchStr] = useSearchStr('');
    const [searchOption, setSearchOption] = useState('shows');


//1.MOUNTS
//2. RERENDER
//2.5 logic before next rerender
//3.UNMOUNT
// useeffect runs atleast once
// console.log('COMPONENT RERENDER');

//     useEffect(() => {

//       console.log('SEARCH OPTION CHANGES', searchOption);
//       return() => {
//         console.log('BEFORE NEXT USEEFFECT RUN', searchOption);
//       };
//     }, [searchOption]);


    const onSearchInputChange = ev => {
        setSearchStr(ev.target.value);
      };
    
     const onRadioChange =ev => {
      setSearchOption(ev.target.value);
     }

     const onSubmit = ev => {
        ev.preventDefault();
    
        const options = {
            q: searchStr,
            searchOption,
        }
        onSearch(options);
     }
    return (
        <form onSubmit={onSubmit}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />
        <label>
          Shows
               <input type="radio" name="search-option" value="shows" checked = {searchOption=== 'shows'} onChange={onRadioChange}/>
        </label>
      
        <label>
          Actors
               <input type="radio" name="search-option" value="actors" checked = {searchOption === 'actors'}  onChange={onRadioChange}/>
        </label>

        <button type="submit">Search</button>
      </form> 
    );

};
export default SearchForm;