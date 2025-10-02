import { useEffect, useState } from "react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import './index.css';

function Procedures(){
  const adres = "https://test-1-k2ol.onrender.com";

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(["Sunucu Bekleniyor..."]);
  const [account, setAccount] = useState([]);
  const [resultTable, setResultTable] = useState([]);
  const [update, setUpdate] = useState(false);

  const sub0 = useState(0);
  const sub1 = useState(0);
  const sub2 = useState(0);
  const debt = useState(0);

  function Test(){
    setResult("Bekleyiniz...");

    axios(adres + "/test")
    .then((res)=> setResult("Test : " + res.data))
    .catch((e)=> setResult("Sunucudan yanıt alınamadı\r\n" + e));
  }

  function GetTable(){
    setResult("Bekleyiniz...");

    axios(adres + "/tables")
    .then((res)=> setResult("Tablo Test : " + res.data.msg[0].table_name))
    .catch((e)=> setResult("Sunucudan yanıt alınamadı"));
  }

  function DropTable(){
    if (window.confirm('Tabloyu silmek istediğinizden emin misin ?')) {
      axios(adres + "/dropTable")
      .then((res)=> {
        setResult("Tablo Sil : Tamam");
    })
      .catch((e)=> setResult("Sunucudan yanıt alınamadı"));
    }
  }

  function GetData(){
    setResult("Bekleyiniz...");
    GetDataProcess();
  }

  function TestData(){
    axios(adres + "/testData")
    .then((res)=> {
      setResult("Güncelleniyor...");

      GetDataProcess();
    })
    .catch((e)=> alert("*Bir hata oluştu : " + e));
  }

  function GetDataProcess(){
    axios.post(adres + "/token", {}, {headers: {'authorization': 'Basic ' + token}})
    .then((res)=> {
      const _token = res.data.response;
      axios.patch(adres + "/getData",
        {
          'fieldData': {},
          'script' : 'getData',
          'authorization': _token
        }
      )
      .then((res)=> {
        setAccount(res.data.response);
      })
      .catch((e)=> setResult("Sunucudan yanıt alınamadı"));
    })
    .catch((e)=> setResult("Sunucudan yanıt alınamadı"));
  }

  function UpsertData(){
    var sub0Value = Number(sub0.current.value);
    var sub1Value = Number(sub1.current.value);
    var sub2Value = Number(sub2.current.value);
    var debtValue = Number(debt.current.value);

    if (sub0Value == 0){
      alert("1. Kodu sıfır (0) olamaz");
    } else {
      axios.post(adres + "/token", {}, {headers: {'authorization': 'Basic ' + token}})
      .then((res)=> {
        const _token = res.data.response;
        axios.post(adres + "/upsert",
          {
            'sub0': sub0Value,
            'sub1': sub1Value,
            'sub2': sub2Value,
            'debt': debtValue,
            'authorization': _token
          }
        )
        .then((res)=> {
          setResult("Güncelleniyor...");

          GetDataProcess();
        })
        .catch((e)=> alert("**Bir hata oluştu : ", e));
      })
      .catch((e)=> alert("*Bir hata oluştu : ", e));
  
      sub0.current.value = "";
      sub1.current.value = "";
      sub2.current.value = "";
      debt.current.value = "";
    }
  }

  const RootButton = (params) => {
    const { items } = params;

    const ButtonClick = () => {
      const index = resultTable.findIndex((x) => x[1] == items[1]);
      const dot = items[1].split(".").length;
      var resultTableCopy = [...resultTable];
      var root, subRoot, pad, sign, sub, code, sum;

      if (resultTableCopy[index][0] === "+") {
        root = account.filter(item => {
          if (dot == 1
              && item.sub0 == Number(items[1])) {
            return true;
          }

          if (dot == 2
              && item.sub0 == Number(items[1].split(".")[0])
              && item.sub1 == Number(items[1].split(".")[1])) {
            return true;
          }
        });

        while (root.length > 0){
          if (dot == 1){
            subRoot = root[0].sub1;
            sub = root.filter(item => item.sub1 == subRoot);
            root = root.filter(item => item.sub1 != subRoot);
            pad = 2;
            sign = "+";
          }
          
          if (dot == 2){
            subRoot = root[0].sub2;
            sub = root.filter(item => item.sub2 == subRoot);
            root = root.filter(item => item.sub2 != subRoot);
            pad = 4;
            sign = "";
          }

          code = items[1] + "." + subRoot.toString().padStart(pad, "0");
          sum = Number(sub.reduce((total, value) => {
            return total + Number(value.debt);
          }, 0)).toFixed(2);

          resultTableCopy.splice(index + 1, 0,
            [
              sign,
              code,
              sum
            ]);
        }

        resultTableCopy[index][0] = "-";
      }else{
        root = resultTableCopy.filter(item => item[1].substring(0, items[1].length) == items[1]);

        sub = root.filter(item => {
          if (dot == 1 && item.sub0 == root[0].sub0) {
            return true;
          }

          if (dot == 2 && item.sub1 == root[0].sub1) {
            return true;
          }
        });

        code = items[1];
        sum = items[2];

        resultTableCopy.splice(index, sub.length,
          [
            "+",
            code,
            sum
          ]);
      }

      setResultTable(resultTableCopy);
      setUpdate(true);
    };

    return <button onClick={ButtonClick}>{items[0]}</button>;
  };

  useEffect(()=>{
    if (loading == false){
      axios(adres + "/sunucu", {timeout: 10000})
      .then((res)=> setResult("Sunucu : " + res.data))
      .catch((e)=> setResult("Sunucudan yanıt alınamadı. Lütfen sayfayı yenileyiniz."));

      setLoading(true);
    }
  }, [loading])

  useEffect(()=>{
    if (account.length > 0){
      var accountCopy = [...account];
      var resultTableCopy = [];
      var root, sub, code, sum;

      while (accountCopy.length > 0){
        root = accountCopy[0].sub0;
        sub = accountCopy.filter(item => item.sub0 == root);
        
        code = root.toString().padStart(3, "0");
        sum = Number(sub.reduce((total, value) => {
          return total + Number(value.debt);
        }, 0)).toFixed(2);
        
        resultTableCopy.push(
          [
            "+",
            code,
            sum
          ]);
        
        accountCopy = accountCopy.filter(item => item.sub0 != root);
      }
  
      setResultTable(resultTableCopy);
      setUpdate(true);
    }
  }, [account]);

  useEffect(() => {
    if (update == true){
      setResult(
        <>
        <table>
          <tr>
            <th></th>
            <th>Hesap Kodu</th>
            <th>Toplam Borç</th>
          </tr>
          {resultTable.map((items, index) => {
            return (
              <tr>
                <td>{items[0] == "" ? "" : <RootButton items={items}/>}</td>
                <td>{items[1]}</td>
                <td>{items[2]}</td>
              </tr>
            )
          })}
        </table>
        </>
      );
   }

    setUpdate(false);
  }, [resultTable]);

  return (
    <>
    <script type="text/javascript" src="https://istanbuluseyret.ibb.gov.tr/wp-content/plugins/bradmax-player/assets/js/default_player.js" id="bradmax-player-js"></script>
    <div id="bradmaxPlayer" class='playerArea'></div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Procedures />
  </React.StrictMode>
);