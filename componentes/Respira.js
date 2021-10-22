import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native'


export default function(){

    const [timerCount, setTimer] = useState(3)
    const [inspirando, setInspirando] = useState(true)


    useEffect(() => {
      let interval = setInterval(() => {
        setTimer(lastTimerCount => {
            lastTimerCount <= 1 && clearInterval(interval)
            return lastTimerCount - 1
        })
      }, 1000) //each count lasts for a second
      //cleanup the interval on complete
      return () => {clearInterval(interval), 
                    setInspirando(!inspirando)}
    }, []);

    const inspirar = () => {
        if(inspirando){
            return  <Text> Inspire... {timerCount}
                </Text>
        } else {
            return null
        }
    }

    const expirar = () => {
        if(!inspirando){            
            return  <Text> Expire... {timerCount}
            </Text>
        }
        return null        
    }

    return(
        <View>
            {inspirar()}
            {expirar()}
        </View>
        
        )
}