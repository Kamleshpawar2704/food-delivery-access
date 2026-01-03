import React, { useState, useEffect } from "react";
import Navigation from "./component/Navigation";
import Header from "./component/Header";
import PopularFood from "./component/PopularFood";
import Offer from "./component/Offer";
import About from "./component/About";
import BestSelling from "./component/BestSelling";
import TodaySpecial from "./component/TodaySpecial";
import FoodMenu from "./component/FoodMenu";
import Chefe from "./component/Chefe";
import FoodNews from "./component/FoodNews";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Cart from "./component/Cart";
import OrderHistory from "./component/OrderHistory";
import { useAuth } from "./context/AuthContext";
import { foodsAPI, ordersAPI } from "./services/api";

const App = () => {
  const { user, loading, logout } = useAuth();
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [_orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        console.log('App: Fetching foods...');
        const response = await foodsAPI.getAllFoods();
        console.log('App: Foods fetched successfully:', response.data.length, 'items');
        setFoods(response.data);
        const uniqueCategories = ['All', ...new Set(response.data.map(food => food.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('App: Error fetching foods:', error);
        // Fallback to hardcoded data if API fails
        console.log('App: Using fallback data');
        const fallbackFoods = [
          {
            _id: '1',
            name: 'Chicken Pizza',
            description: 'Delicious chicken pizza with fresh toppings',
            price: 250,
            category: 'Pizza',
            image: '/Image/Illustration/Popular-Food (1).png'
          },
          {
            _id: '2',
            name: 'Veg Pasta',
            description: 'Tasty vegetarian pasta',
            price: 150,
            category: 'Pasta',
            image: '/Image/Illustration/Popular-Food (2).png'
          },
          {
            _id: '3',
            name: 'Chicken Tandoori',
            description: 'Spicy tandoori chicken',
            price: 450,
            category: 'Main Course',
            image: '/Image/Illustration/Popular-Food (3).png'
          },
          {
            _id: '4',
            name: 'Veg Burger',
            description: 'Healthy veg burger',
            price: 95,
            category: 'Burger',
            image: '/Image/Illustration/Popular-Food (4).png'
          },
          {
            _id: '5',
            name: 'French Fries',
            description: 'Crispy golden french fries',
            price: 80,
            category: 'Sides',
            image: '/Image/Illustration/french-fries.png'
          },
          {
            _id: '6',
            name: 'Chicken Nuggets',
            description: 'Crispy chicken nuggets',
            price: 120,
            category: 'Fast Food',
            image: '/Image/Illustration/chicken-nuggets.png'
          }
        ];
        setFoods(fallbackFoods);
        const uniqueCategories = ['All', ...new Set(fallbackFoods.map(food => food.category))];
        setCategories(uniqueCategories);
      }
    };
    fetchFoods();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (food) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === food._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (foodId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== foodId));
  };

  const updateQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item._id === foodId ? { ...item, quantity } : item
        )
      );
    }
  };

  const placeOrder = async (deliveryAddress) => {
    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    if (!deliveryAddress || deliveryAddress.trim().length < 10) {
      setError('Please enter a valid delivery address (at least 10 characters)');
      return;
    }

    const orderData = {
      customerName: user.name,
      customerEmail: user.email,
      items: cart.map(item => ({
        food: item._id,
        quantity: item.quantity
      })),
      totalAmount: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      deliveryAddress: deliveryAddress.trim()
    };

    setOrderLoading(true);
    setError(null);

    try {
      await ordersAPI.createOrder(orderData);
      alert('Order placed successfully!');
      setCart([]);
    } catch (error) {
      console.error('Error placing order:', error);
      setError(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    console.log('App: Loading...');
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('App: No user, showing login');
    return <Login />;
  }

  console.log('App: User logged in, rendering main app', user);

  try {
    const logo = "./Image/Illustration/FooterLogo.svg";
        const links=["Home","About Us","Shop","Page","Blog","Contact us"]
        const icons = user ? ["bi bi-search", "bi bi-bag", "bi bi-box-arrow-right"] : ["bi bi-search", "bi bi-bag"]
        const ListIcon="bi bi-list";
        const ListImg="/Image/Illustration/imgi_1_logo.svg";
        


    const carouselData = [
            {
                active:"carousel-item active",
                carouselPara: "WELCOME FRESHEAT",
                carouselh1: "SPICY FRIED CHICKEN",
                carouselbtn: "ORDER NOW",
                carouselImg: "/Image/Illustration/imgi_21_bannerThumb1_1.png"
            },
            {
                active:"carousel-item ",
                carouselPara: "WELCOME FRESHEAT",
                carouselh1: "CHINCAGO DEEP BURGER KING",
                carouselbtn: "ORDER NOW",
                carouselImg: "/Image/Illustration/imgi_22_bannerThumb1_2.png"
            },
            {
                active:"carousel-item ",
                carouselPara: "WELCOME FRESHEAT",
                carouselh1: "SPICY FRIED CHICKEN",
                carouselbtn: "ORDER NOW",
                carouselImg: "/Image/Illustration/imgi_20_bannerThumb1_3.png"
            }
            ];

    const PopularFoodTitle="Best Food"
    const PopularFoodHeading="Popular Food Items"
    const PopularFoodBurger="/Image/Illustration/Burger-sticker.png";
    const PopularFoodChilli="/Image/Illustration/chilli (1).png";

    const PopularFoodData = filteredFoods.slice(0, 6).map((food, index) => ({
        ...food,
        dish1Img: food.image || `/Image/Illustration/Popular-Food (${(index % 4) + 1}).png`,
        dish1Name: food.name,
        dish1Fee: "The Registration Fee",
        dish1Price: `Rs.${food.price}`,
        comment: index === 4 ? "d-none d-md-block" : undefined
    }));

    const offerData=[
        {
            offertitle:"ON THIS WEEK",
            offerDish:"SPICY FRIED CHICKEN",
            offerTime:"Limits Time Offer",
            offerBtn:"ORDER NOW",
            offerimg:"/Image/Illustration/offer-img (2).png"
        },
        {
            offertitle:"WELCOME FRESHEAT",
            offerDish:"TODAY SPACIAL FOOD",
            offerTime:"Limits Time Offer",
            offerBtn:"ORDER NOW",
            offerimg:"/Image/Illustration/offer-img (3).png"
        },
        {
            offertitle:"ON THIS WEEK",
            offerDish:"SPECIAL CHICKEN ROLL",
            offerTime:"Limits Time Offer",
            offerBtn:"ORDER NOW",
            offerimg:"/Image/Illustration/offer-img (1).png"
        },

    ]

    const aboutImgLeft="/Image/Illustration/About Us img (4).png"
    const aboutImgRight="/Image/Illustration/About Us img (1).png"
    const aboutTitle="About US"
    const aboutHeading="Variety of flavours from american cuisine"
    const aboutDetail="It is a long established fact that a reader will be distracted the readable content of a page when looking at layout the point established fact that"
    const aboutBtn="ORDER NOW"

    const BestSellingTitle="POPULAR DISHES"
    const BestSellingHeading="Best selling Dishes"
    const BestSellingBtn="VIEW ALL ITEMS"
    const BestSellingData = filteredFoods.slice(6, 12).map((food, index) => ({
        ...food,
        dishLike: "bi bi-heart",
        dishImg: food.image || `/Image/Illustration/Selling dish (${(index % 4) + 1}).png`,
        dishName: food.name,
        dishFee: "The Registration Fee",
        dishPrice: `Rs.${food.price}`
    }));

    const TodaySpecialStickerUp="./Image/Illustration/TodaySpeciaImg (1).svg"
    const TodaySpecialStickerDown="./Image/Illustration/TodaySpeciaImg (2).svg"
    const TodaySpecialTitle="WELCOME FRESHEAT";
    const TodaySpecialHeading="TODAY SPACIAL FOOD";
    const TodaySpecialTime="Limits Time Offer";
    const TodaySpecialBtn="ORDER NOW ";
    const TodaySpecialImg="/Image/Illustration/TodaySpecialMainimg.png";
    const TodaySpecialTomato="/Image/Illustration/TodaySpeciaImg (3).png";


    const FoodMenuTitle="FOOD MENU";
    const FoodMenuHeading="Fresheat Foods Menu";

    const FoodMenuChoice =[
        {
           FoodMenuChoiceImg:"/Image/Illustration/imgi_58_menuIcon1_1.png",
           FoodMenuChoiceName:"Fast Food",
        },
        {
           FoodMenuChoiceImg:"/Image/Illustration/imgi_59_menuIcon1_2.png",
           FoodMenuChoiceName:"Drinks & Juice",
        },
        {
           FoodMenuChoiceImg:"/Image/Illustration/imgi_60_menuIcon1_3.png",
           FoodMenuChoiceName:"Chicken Pizza",
        },
        {
           FoodMenuChoiceImg:"/Image/Illustration/imgi_61_menuIcon1_4.png",
           FoodMenuChoiceName:"Fresh Pasta",
        },
    ]

    const FoodMenuCard = foods.slice(0, 10).map((food, index) => ({
        FoodMenuImg: food.image || `/Image/Illustration/Foodmenucard (${(index % 10) + 1}).png`,
        FoodMenuName: food.name,
        FoodMenuPara: food.description || "It's a testament to our.",
        FoodMenuPrice: `Rs.${food.price}`
    }));

    const FoodMenuAdd1="BURGER | CHICKEN PIZZA | GRILLED CHICKEN";

    const ChefeTitle="OUR CHEFE";
    const ChefeHeading="Meet Our Expert Chefe";

    const ChefeData=[
        {
            ChefeImg:"/Image/Illustration/ChefeImg (1).png",
            ChefeName:"Ronald Richards",
            ChefePosition:"Senior Cooker"
        },
        {
            ChefeImg:"/Image/Illustration/ChefeImg (2).png",
            ChefeName:"Rahl Pawar",
            ChefePosition:"Chefe Manager"
        },
        {
            ChefeImg:"/Image/Illustration/ChefeImg (3).png",
            ChefeName:"Marvin Jadhav",
            ChefePosition:"Main Chefe"
        },
    ]


    const FoodNewsTitle="LATEST NEWS";
    const FoodNewsHeading="Our Latest Foods News";
    const FoodNewsData=[
        {
            FoodNewsImg:"/Image/Illustration/FoodNewsImg (1).jpg",
            FoodNewsDate:"17 Dec",
            FoodNewsAdmin:"By Admin",
            FoodNewsTags:"Chicken",
            FoodNewsHead:"Benifits Of Healthy And Safety Measure",
            FoodNewsRead:"Read More"
        },
        
        {
            FoodNewsImg:"/Image/Illustration/FoodNewsImg (2).jpg",
            FoodNewsDate:"27 Dec",
            FoodNewsAdmin:"By Admin",
            FoodNewsTags:"Chicken",
            FoodNewsHead:"Benifits Of Healthy And Safety Measure",
            FoodNewsRead:"Read More"
        },
        {
            FoodNewsImg:"/Image/Illustration/FoodNewsImg (2).jpg",
            FoodNewsDate:"7 Nov",
            FoodNewsAdmin:"By Admin",
            FoodNewsTags:"Chicken",
            FoodNewsHead:"Benifits Of Healthy And Safety Measure",
            FoodNewsRead:"Read More"
        },
        {
            FoodNewsImg:"/Image/Illustration/FoodNewsImg (3).jpg",
            FoodNewsDate:"15 Dec",
            FoodNewsAdmin:"By Admin",
            FoodNewsTags:"Chicken",
            FoodNewsHead:"Benifits Of Healthy And Safety Measure",
            FoodNewsRead:"Read More"
        }
    ]


    const FooterContact=[
        {
            ContactIcon:"bi bi-geo-alt-fill",
            ContactAddressTitle:"Address",
            ContactAddress:"4648 Rocky Road Philadelphia"
        },
        {
            ContactIcon:"bi bi-envelope",
            ContactAddressTitle:"Send Email",
            ContactAddress:"info@exmple.com"
        },
        {
            ContactIcon:"bi bi-telephone-fill",
            ContactAddressTitle:"Call Emergency",
            ContactAddress:"+88 0123 654 99"
        }
    ]

    const FooterLogo="./Image/Illustration/FooterLogo.svg";
    const FooterLogoBelow="Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a lacinia curabitur lacinia mollis";
    const FooterSocialMedia=[
        "bi bi-facebook",
        "bi bi-twitter-x",
        "bi bi-linkedin",
        "bi bi-youtube"
    ]

    const QuickLinkTitle="Quick Links";
    const QuickLinkData=[
        "About Us",
        "Our Gallery",
        "Our Blogs",
        "FAQ's",
        "Contact Us"
    ]

    const OurMenuTitle="Our Menu";
    const OurMenuData=[
        "Bugger King",
        "Pizza King",
        "Fresh Food",
        "Vegetables",
        "Desserts"
    ]

    const ContactUsTitle="Contact Us";
    const ContactUsTime1="Monday – Friday: 8am – 4pm ";
    const ContactUsTime2="Saturday: 8am – 12am";
    const ContactUsTerms="I agree to the Privacy Policy.";

    return(
        <React.Fragment>

            <Navigation logos={logo} nav={links} icon={icons} ListIcon={ListIcon} ListImg={ListImg} cartComponent={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} placeOrder={placeOrder} loading={_orderLoading} error={error} />} onIconClick={(index) => {
                if (icons[index] === "bi bi-box-arrow-right") logout();
            }} onSearchChange={setSearchTerm} />

            <Header slides={carouselData} />

            <div className="container my-4">
              <div className="category-filter">
                <h5 className="mb-3">Filter by Category:</h5>
                <div className="category-buttons">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div id="popular-food">
              <PopularFood food={PopularFoodData} heading={PopularFoodHeading} PopularFoodTitle={PopularFoodTitle} PopularFoodBurger={PopularFoodBurger} PopularFoodChilli={PopularFoodChilli} addToCart={addToCart} />
            </div>

            <Offer offer={offerData}/>

            <About aboutImgLeft={aboutImgLeft} aboutImgRight={aboutImgRight} aboutTitle={aboutTitle} aboutHeading={aboutHeading} aboutDetail={aboutDetail} aboutBtn={aboutBtn} />

            <BestSelling BestSellingTitle={BestSellingTitle} BestSellingHeading={BestSellingHeading} BestSellingData={BestSellingData} BestSellingBtn={BestSellingBtn} addToCart={addToCart} />
            
            <TodaySpecial TodaySpecialStickerUp={TodaySpecialStickerUp} TodaySpecialStickerDown={TodaySpecialStickerDown} TodaySpecialTitle={TodaySpecialTitle} TodaySpecialHeading={TodaySpecialHeading} TodaySpecialTime={TodaySpecialTime} TodaySpecialBtn={TodaySpecialBtn} TodaySpecialImg={TodaySpecialImg} TodaySpecialTomato={TodaySpecialTomato}  />

            <FoodMenu FoodMenuTitle={FoodMenuTitle} FoodMenuHeading={FoodMenuHeading} FoodMenuChoice={FoodMenuChoice} FoodMenuCard={FoodMenuCard} FoodMenuAdd1={FoodMenuAdd1}  />

            <Chefe ChefeTitle={ChefeTitle} ChefeHeading={ChefeHeading} ChefeData={ChefeData}  />

            <FoodNews FoodNewsTitle={FoodNewsTitle} FoodNewsHeading={FoodNewsHeading} FoodNewsData={FoodNewsData} />

            <Footer FooterContact={FooterContact}  FooterLogo={FooterLogo}  FooterLogoBelow={FooterLogoBelow} FooterSocialMedia={FooterSocialMedia} QuickLinkTitle={QuickLinkTitle}  QuickLinkData={QuickLinkData} OurMenuTitle={OurMenuTitle} OurMenuData={OurMenuData} ContactUsTitle={ContactUsTitle} ContactUsTime1={ContactUsTime1} ContactUsTime2={ContactUsTime2}  ContactUsTerms={ContactUsTerms}   />

            <OrderHistory />

        </React.Fragment>
    );
  } catch (error) {
    console.error('App: Error rendering main app:', error);
    return <div style={{ padding: '20px', color: 'red' }}>Error loading app: {error.message}</div>;
  }
}

export default App;