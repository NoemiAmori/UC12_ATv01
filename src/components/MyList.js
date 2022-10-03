import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
function getImage(imageName) {
    switch (imageName) {
        case "img1.png": return require('../images/img1.png');
        case "img2.png": return require('../images/img2.png');
        case "img3.png": return require('../images/img3.png');
    }
}
export default class MyList extends Component {
    state = {
        loading: false,
        data: [],
        current_page: 1,
        error: null,
        hasMore: true
    }

    UNSAFE_componentWillMount() { this.getListOfData(); };

    getListOfData = () => {
        if (this.state.loading) { return; }
        this.setState({ loading: true });
        let newData = [];
        newData.push({
            title: "Lorem ipsum",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in congue risus, non viverra tellus. Nam faucibus ligula non metus ultrices mollis. Cras dolor purus, hendrerit eu eros quis, dignissim eleifend mi. In tincidunt mi in diam egestas congue ac ut purus. Nulla semper libero vitae blandit vehicula.",
            image: "img1.png",
            id: this.state.data.length
        });
        newData.push({
            title: "Curabitur vulputate",
            text: "Curabitur vulputate enim in lacus imperdiet, a convallis odio posuere. Nulla id ex et purus sodales rutrum non eu eros. Ut consequat est lacus.",
            image: "img2.png",
            id: this.state.data.length + 1
        });
        newData.push({
            title: "Proin hendrerit",
            text: "Proin hendrerit nisl id turpis bibendum, sit amet scelerisque augue elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a blandit sapien.",
            image: "img3.png",
            id: this.state.data.length + 2
        });
        this.setState({
            hasMore: true,
            data: [...this.state.data, ...newData],
            loading: false,
            current_page: this.state.current_page + 1
        });
    }

    isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
        return layoutMeasurement.height + contentOffset.y
            >= contentSize.height - 50;
    }

    renderList = () => {
        return (this.state.data.map((u) => {
            return (
                <TouchableOpacity key={u.id}>
                    <View style={{ padding: 10 }}>
                        <Image style={{width: 400, height:300}} source={getImage(u.image)} />
                        <Text style={{ fontSize: 15 }}>{u.title}</Text>
                        <Text>{u.text}</Text>
                    </View>
                </TouchableOpacity>);
        })
        );

    }

    render() {
        return (
            <ScrollView offScroll={({ nativeEvent }) => {
                if (this.isCloseToBottom(nativeEvent) && this.state.hasMore) {
                    this.getListOfData();
                }
            }}>
                {this.renderList()}
            </ScrollView>
        );
    }
}