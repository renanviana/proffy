import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import PageHeader from '../../components/PageHeader'

import styles from './styles'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'

import AsyncStorage from '@react-native-community/async-storage'

function TeacherList() {

    const [isFiltersVisible, setFiltersVisible] = useState(true)

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')
    const [teachers, setTeachers] = useState([])

    const [favoritesIds, setFavoritesIds] = useState<number[]>([])

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((el: Teacher) => {
                    return el.id
                })
                setFavoritesIds(favoritedTeachersIds)
            }
        })
    }

    function handleToggleFiltersVisible() {
        setFiltersVisible(!isFiltersVisible)
    }
    
    function handleFiltersSubmit() {
        loadFavorites()
        api.get('classes', {
            params: {
                subject,
                week_day,
                time 
            }
        }).then(response => {
            setFiltersVisible(false)
            setTeachers(response.data)
        })
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible &&
                    (<View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual o horario?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtar</Text>
                        </RectButton>
                    </View>)
                }
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}>
                { teachers.map((el: Teacher) => {
                    return ( 
                        <TeacherItem 
                            key={el.id} 
                            teacher={el} 
                            favorited={favoritesIds.includes(el.id)}
                        />
                    )
                }) }
            </ScrollView>
        </View>
    )
}

export default TeacherList