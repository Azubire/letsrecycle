import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Card, Text, useTheme } from "react-native-paper";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import {
  fetchRecyclingCategories,
  getAllCategory,
  RecyclingCategoryTypes,
} from "../store/features/RecyclingCategorySlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import CustomStatusbar from "../components/CustomStatusbar";
import { baseUrl } from "../utils/helpers";

const Categories = ({ navigation }: HomeStackScreenProps<"Categories">) => {
  const [categories, setCategories] =
    React.useState<RecyclingCategoryTypes[]>();
  const [loading, setLoading] = React.useState(true);

  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const response = useAppSelector(getAllCategory);

  const getData = async () => {
    if (response.status === "idle") {
      try {
        const data = await dispatch(fetchRecyclingCategories());
        // console.log("data", data);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  React.useEffect(() => {
    getData();
  }, [response.status]);

  return (
    <>
      <CustomStatusbar style="light" />
      {response.status === "loading" || response.status === "idle" ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={response.data}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  paddingHorizontal: 6,
                  marginBottom: 16,
                  marginTop: 24,
                }}
              >
                <Card style={{ backgroundColor: colors.light }}>
                  <Card.Title
                    titleStyle={{ marginTop: 12 }}
                    titleVariant="bodySmall"
                    title="Let's Recycle With Recycle"
                    subtitleStyle={{
                      marginBottom: 24,
                    }}
                    subtitleNumberOfLines={4}
                    subtitleVariant="bodyLarge"
                    subtitle="Select from the categories below to start uploading your material"
                  />
                  <Image
                    source={require("../../assets/images/boy.png")}
                    resizeMode="contain"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      bottom: 0,
                      height: "100%",
                      zIndex: -1,
                    }}
                  />

                  <Card.Content>
                    <Text variant="bodyLarge" style={{ color: colors.info }}>
                      It's easy to get started
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            );
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Drawer", {
                  screen: "Dashboard",
                  params: { screen: "Sell", params: { id: item.id } },
                });
              }}
              style={{
                flex: 1,
                justifyContent: "center",
                margin: 6,
              }}
            >
              <Card style={{ backgroundColor: colors.light }}>
                <Card.Cover
                  resizeMode="contain"
                  source={{
                    uri: `${baseUrl}/images/categoryImages/${item.icon}`,
                  }}
                  style={{
                    paddingTop: 10,
                    // borderWidth: 1,
                    alignSelf: "center",
                    height: 100,
                    width: 100,
                    backgroundColor: colors.light,
                  }}
                />
                <Card.Content>
                  <Text
                    variant="titleMedium"
                    style={{ textAlign: "center", marginVertical: 16 }}
                  >
                    {item.name}
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
};

export default Categories;
