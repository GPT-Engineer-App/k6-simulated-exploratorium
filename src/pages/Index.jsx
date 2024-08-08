import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Paw, Info } from "lucide-react";

const CatBreed = ({ name, description, image }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4 overflow-hidden">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {name}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [factIndex, setFactIndex] = useState(0);

  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
    { name: "Maine Coon", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
    { name: "Persian", description: "Recognized for their long fur and flat faces.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
    { name: "Bengal", description: "Wild-looking cats with a spotted or marbled coat pattern.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
    { name: "Sphynx", description: "Hairless cats known for their wrinkled skin and extroverted personality.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
  ];

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1200px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
  ];

  const catFacts = [
    "Cats sleep for about 70% of their lives.",
    "A group of cats is called a clowder.",
    "Cats have over 20 vocalizations, including the meow.",
    "A cat's nose print is unique, like a human's fingerprint.",
    "Cats can rotate their ears 180 degrees.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold mb-4 text-purple-800">
            Purrfect Pals
          </h1>
          <p className="text-xl text-purple-600">Discover the Fascinating World of Cats</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-4 rounded-lg shadow-md mb-8"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={factIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-center text-purple-700"
            >
              <Info className="inline-block mr-2 h-5 w-5" />
              {catFacts[factIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={src}
                    alt={`Cat ${index + 1}`}
                    className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview" className="text-lg">
              <Paw className="mr-2 h-5 w-5" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="breeds" className="text-lg">
              <Badge variant="secondary" className="mr-2">
                {catBreeds.length}
              </Badge>
              Breeds
            </TabsTrigger>
            <TabsTrigger value="care" className="text-lg">
              <Heart className="mr-2 h-5 w-5" />
              Care Tips
            </TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-purple-800">Cat Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl text-gray-700 leading-relaxed">
                      Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
                      independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
                      characteristics and personalities. From playful kittens to wise senior cats, these furry companions bring
                      joy and comfort to millions of homes worldwide.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="breeds">
                <h2 className="text-3xl font-semibold mb-6 text-purple-800">Popular Cat Breeds</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catBreeds.map((breed, index) => (
                    <CatBreed key={index} name={breed.name} description={breed.description} image={breed.image} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="care">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-purple-800">Cat Care Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        "Provide a balanced diet suitable for your cat's age and health condition",
                        "Ensure fresh water is always available",
                        "Regular grooming to keep their coat healthy",
                        "Schedule regular veterinary check-ups",
                        "Provide mental stimulation with toys and play sessions",
                      ].map((tip, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <Paw className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                          <span className="text-lg text-gray-700">{tip}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
