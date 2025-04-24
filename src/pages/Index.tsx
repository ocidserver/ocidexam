
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  const handleLogin = () => {
    setShowAuthModal(false);
    // In a real app, we would handle authentication here
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                Master English Tests with Confidence
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
                Comprehensive preparation for TOEFL ITP and IELTS exams with realistic practice tests, personalized learning, and detailed performance analysis.
              </p>
              <div className="space-x-4">
                <Button size="lg" onClick={toggleAuthModal}>
                  Get Started
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#features">Learn More</a>
                </Button>
              </div>
            </div>
            <div className="relative lg:block hidden">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
                alt="Student studying on laptop"
                className="mx-auto rounded-lg shadow-lg"
                width={500}
                height={300}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Test Types Section */}
      <section className="py-12 md:py-16" id="features">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Choose Your Test</h2>
            <p className="text-muted-foreground mt-2">
              Comprehensive preparation for both major English proficiency exams
            </p>
          </div>

          <Tabs defaultValue="toefl" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="toefl">TOEFL ITP</TabsTrigger>
              <TabsTrigger value="ielts">IELTS</TabsTrigger>
            </TabsList>
            <TabsContent value="toefl" className="mt-6">
              <Card>
                <CardHeader className="bg-toefl/10">
                  <CardTitle className="text-toefl">TOEFL ITP</CardTitle>
                  <CardDescription>
                    Institutional Testing Program by ETS
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <div className="p-2 rounded-full bg-toefl/10 mb-2">
                        <BookOpen className="h-6 w-6 text-toefl" />
                      </div>
                      <h3 className="font-medium">Listening Comprehension</h3>
                      <p className="text-sm text-muted-foreground">
                        50 questions · 35 minutes
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <div className="p-2 rounded-full bg-toefl/10 mb-2">
                        <CheckCircle className="h-6 w-6 text-toefl" />
                      </div>
                      <h3 className="font-medium">Structure & Written Expression</h3>
                      <p className="text-sm text-muted-foreground">
                        40 questions · 25 minutes
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <div className="p-2 rounded-full bg-toefl/10 mb-2">
                        <Clock className="h-6 w-6 text-toefl" />
                      </div>
                      <h3 className="font-medium">Reading Comprehension</h3>
                      <p className="text-sm text-muted-foreground">
                        50 questions · 55 minutes
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <Button className="bg-toefl hover:bg-toefl/90" onClick={toggleAuthModal}>
                      Practice TOEFL ITP
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ielts" className="mt-6">
              <Card>
                <CardHeader className="bg-ielts/10">
                  <CardTitle className="text-ielts">IELTS</CardTitle>
                  <CardDescription>
                    International English Language Testing System
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <div className="p-2 rounded-full bg-ielts/10 mb-2">
                        <BookOpen className="h-6 w-6 text-ielts" />
                      </div>
                      <h3 className="font-medium">Listening</h3>
                      <p className="text-sm text-muted-foreground">
                        40 questions · 30 minutes
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <div className="p-2 rounded-full bg-ielts/10 mb-2">
                        <CheckCircle className="h-6 w-6 text-ielts" />
                      </div>
                      <h3 className="font-medium">Reading</h3>
                      <p className="text-sm text-muted-foreground">
                        40 questions · 60 minutes
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <div className="p-2 rounded-full bg-ielts/10 mb-2">
                        <Clock className="h-6 w-6 text-ielts" />
                      </div>
                      <h3 className="font-medium">Writing</h3>
                      <p className="text-sm text-muted-foreground">
                        2 tasks · 60 minutes
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                      <div className="p-2 rounded-full bg-ielts/10 mb-2">
                        <User className="h-6 w-6 text-ielts" />
                      </div>
                      <h3 className="font-medium">Speaking</h3>
                      <p className="text-sm text-muted-foreground">
                        3 parts · 11-14 minutes
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <Button className="bg-ielts hover:bg-ielts/90" onClick={toggleAuthModal}>
                      Practice IELTS
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Why Choose Our Platform</h2>
            <p className="text-muted-foreground mt-2">
              Everything you need to succeed in your English proficiency exams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-full bg-primary/10 mb-2 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Realistic Practice Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Experience authentic test simulations that mirror the format, timing, and difficulty of actual TOEFL ITP and IELTS exams.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-full bg-primary/10 mb-2 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Self-Study Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access comprehensive learning materials organized by topic to strengthen specific skills at your own pace.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-full bg-primary/10 mb-2 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Personalized Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your progress with detailed performance metrics and personalized recommendations for improvement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground">
              Join thousands of students who have improved their English test scores with our platform.
            </p>
            <Button size="lg" onClick={toggleAuthModal}>
              Create Free Account
            </Button>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={toggleAuthModal} onLogin={handleLogin} />}
    </div>
  );
};

export default Index;
