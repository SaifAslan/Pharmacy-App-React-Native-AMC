import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { IReview } from "../interfaces/pharmacy";

interface Props {
  review: IReview;
}

const ReviewCard = ({ review }: Props) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <Image
          style={styles.authorImage}
          source={{ uri: review.profile_photo_url }}
        />
        <Text style={styles.authorName}>{review.author_name}</Text>
        <Text style={styles.authorName}>{"⭐️ "+review.rating}</Text>

      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  reviewContainer: {
    borderBottomColor: "#6FB98F",
    borderBottomWidth: 2,
    width: "100%",
    padding: 13,
    paddingHorizontal:0,
    flexDirection:"column"
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorImage: {
    width: 23,
    height: 23,
    marginEnd:6
  },
  authorName: {
    fontSize: 12,
    color: "white",
    marginEnd:6
  },
  reviewText:{
    fontSize:12,
    color:"white",
    marginTop:8
  }
});
