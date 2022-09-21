import * as React from 'react';
import { View } from 'react-native';
import Loading from '../components/Loading'
import Table from '../components/Table'
import Popup from '../components/Popup'
import { Button, Text, Provider, Paragraph } from 'react-native-paper';
const tables={}
let onPresses=[]
export default function Resources({navigation}){
  //Array which will be used to generate table
  const [tableData, setTableData] = React.useState([]);
  //Determine which table user is currently viewing: food, housing or clothing
  const [mode, setMode] = React.useState("food")
  const [params, setParams]  = React.useState([])
  const tableHead=['Name', 'Address']

  const [visible, setVisible] = React.useState(false);
  const showDialog = (dt) => {
    
    console.log(dt)
    setVisible(true);
  }
  const hideDialog = () => setVisible(false);

  const popupContent=()=>{
    return (<Paragraph>This is simple dialog</Paragraph>)
  }
  const popupActions=()=>{
    return (<Button onPress={()=>{hideDialog()}}>Done</Button>)
  }
  //Set up array to create table
  const makeTable = (data)=>{
    let table=[]
    data.forEach(el=>{
      table.push([el.name, el.address])
    })
    setTableData(table)
  }

  //Fetch the appropriate resource from API
  const fetchData = (resource) => {
    setTableData([])
    return fetch("https://us-central1-newbeginnings-7fed9.cloudfunctions.net/widgets/resources/"+resource).then(data=>{
        return data.json()
      }).then(res=>{
        tables[resource]=res
        setParams([res])
        return res
      })
  };
 
  //On load and when user changes tables, fetch data from API and prepare the new table
  React.useEffect(() => {
    fetchData(mode).then(()=>{makeTable(tables[mode])})
  }, [mode]);
  React.useEffect(()=>{
    onPresses=[showDialog, console.log]
  },[])

    return (
      <Provider>
        <View style={{ flex: 1, paddingTop: '10%'}}>
          <Popup visible={visible} content={popupContent} dismiss={hideDialog} actions={popupActions}/>
          {/* Screen header (buttons which allow users to switch tables) */}
          <View style={{backgroundColor:'#FFC9B5', height:'auto', width:'auto', borderRadius:10, margin: '2%', padding: '5%'}}>
            <Text style={{textAlign: 'center', fontSize: 15, margin: '2%'}}>Tap on a resource name for more information, including contact info.</Text>
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
              <Button icon="food-fork-drink" color="#f7b1ab" mode={mode==="food"?"contained":"outlined"} onPress={() => {
                  setMode("food")
                }}>
                Food
              </Button>
              <Button icon="home-city" color="#D8AA96" mode={mode==="housing"?"contained":"outlined"} onPress={() => {
                  setMode("housing")
                }}>
                Housing
              </Button>
              <Button icon="hanger" color="#807182" mode={mode==="clothing"?"contained":"outlined"} onPress={() => {
                  setMode("clothing")
                }}>
                Clothing
              </Button>
            </View>
          </View>
        {/* Render either a loading screen or the appropriate table */}
        {tableData.length==0?<Loading/>:<Table header={tableHead} table={tableData} onPresses={onPresses} params={params}/>}
        </View>
      </Provider>
    );
}


