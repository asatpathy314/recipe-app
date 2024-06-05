import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

function TagsSearch({ type, inputState, changeInputState }) {
  const userType = ["Official", "User-generated"];
  const dishType = ["Biscuits and cookies", "Bread", "Cereals", "Condiments and sauces", "Desserts", "Drinks", "Main course", "Pancake", "Preps", "Preserve", "Salad", "Sandwiches", "Side dish", "Soup", "Starter", "Sweets"];
  const mealType = ["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];
  const cuisineType = ["American", "Asian", "British", "Caribbean", "Central Europe", "Chinese", "Eastern Europe", "French", "Indian", "Italian", "Japanese", "Kosher", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "South American", "South East Asian"];

  const handleSelect = (value) => {
    changeInputState(value);
  };

  return (
    <AutoComplete openOnFocus onChange={handleSelect}>
      <AutoCompleteInput
        variant="filled"
        backgroundColor="transparent"
        value={inputState}
        onChange={(e) => changeInputState(e.target.value)}
        border="1px solid rgb(224, 224, 224)"
        _hover={{ backgroundColor: "rgb(231, 231, 231)" }}
        placeholder={
          type === "dish" ? "Dish Type" : type === "meal" ? "Meal type" : type === "cuisine" ? "Cuisine Type" : type === "user" ? "User-made or official?" : ""
        }
      />
      <AutoCompleteList>
        {type === "dish" ?
          dishType.map((option, idx) => (
            <AutoCompleteItem
              key={idx}
              value={option}
              _hover={{ backgroundColor: "rgb(231, 231, 231)" }}
            >
              {option}
            </AutoCompleteItem>
          )) : type === "meal" ?
            mealType.map((option, idx) => (
              <AutoCompleteItem
                key={idx}
                value={option}
                _hover={{ backgroundColor: "rgb(231, 231, 231)" }}
              >
                {option}
              </AutoCompleteItem>
            )) : type === "cuisine" ?
              cuisineType.map((option, idx) => (
                <AutoCompleteItem
                  key={idx}
                  value={option}
                  _hover={{ backgroundColor: "rgb(231, 231, 231)" }}
                >
                  {option}
                </AutoCompleteItem>
              )) : type === "user" ?
                userType.map((option, idx) => (
                  <AutoCompleteItem
                    key={idx}
                    value={option}
                    _hover={{ backgroundColor: "rgb(231, 231, 231)" }}
                  >
                    {option}
                  </AutoCompleteItem>
                )) : <></>
        }
      </AutoCompleteList>
    </AutoComplete>
  );
}

export default TagsSearch;
