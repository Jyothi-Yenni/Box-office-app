import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchForShows, searchForPeople } from './../api/tvmaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';
const Home = () => {
  const [filter, setFilter] = useState(null);

  const { data: apiData, error: apiDataError} = useQuery({
    queryKey: ['search', filter],
    queryFn: () => 
      filter.searchOption === 'shows' 
      ? searchForShows(filter.q) 
      : searchForPeople(filter.q),
    // ⬇️ disabled as long as the filter is empty
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  const onSearch = async ({q, searchOption}) => {
    setFilter({ q, searchOption })
  };
// const [apiData, setApiData] = useState(null);
// const [apiDataError, setApiDataError] = useState(null);
// console.log(searchOption);
//console.log(apiDataError);

  //   try {
  //     setApiDataError(null);
  //    let result;
  //     if(searchOption === 'shows'){
  //        result = await searchForShows(q);
  //     setApiData(result); 
  //     } else{
  //        result = await searchForPeople(q);
  //       setApiData(result);
  //     }
  //   } catch (error) {
  //     setApiDataError(error);
  //   }
  //   //console.log(apiData);
  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occured: {apiDataError.message}</div>;
    }

 if(apiData?.length === 0){
  return <div>No results</div>
 }
 
    if (apiData) {
      return apiData[0].show
      ? (
      <ShowGrid shows={apiData}/> )
      : (
      <ActorsGrid actors = {apiData}/>
      );
    }

    return null;

    // { apiData.map((
    //     data => <div key={data.show.id}> {data.show.name} </div>
    //     ))}
  };
  return (
    <div>
      {
        <SearchForm onSearch={onSearch} />
    }

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
