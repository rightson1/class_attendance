"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Users, MapPin, BookOpen } from "lucide-react";

export default function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <UserCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="ml-2 text-lg font-bold text-gray-800 dark:text-white">
            AttendEase
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            href="#roles"
          >
            Roles
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1
                  className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none xl:text-8xl/none
                                ${
                                  mounted ? "animate-fade-in-up" : "opacity-0"
                                }`}
                >
                  Welcome to AttendEase
                </h1>
                <p
                  className={`mx-auto max-w-[700px] text-xl md:text-2xl text-blue-100 
                                ${
                                  mounted
                                    ? "animate-fade-in-up animation-delay-200"
                                    : "opacity-0"
                                }`}
                >
                  Revolutionizing class attendance with our innovative
                  location-based system.
                </p>
              </div>
              <div
                className={`space-x-4 ${
                  mounted
                    ? "animate-fade-in-up animation-delay-400"
                    : "opacity-0"
                }`}
              >
                <Button
                  asChild
                  className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <Link href={"/auth/login"}>Get Started</Link>
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600 transition-colors"
                >
                  <Link href={"/auth/login"}>Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-800 dark:text-white">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600 dark:text-blue-400">
                    <MapPin className="w-6 h-6 mr-2" />
                    Location-Based
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Automatically verifies student presence based on their
                  proximity to the lecture hall.
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600 dark:text-blue-400">
                    <Users className="w-6 h-6 mr-2" />
                    User-Friendly
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Intuitive interfaces for both students and lecturers, ensuring
                  ease of use.
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-6 h-6 mr-2" />
                    Comprehensive Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Generate detailed attendance reports for better academic
                  management.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="roles"
          className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-800 dark:text-white">
              Choose Your Role
            </h2>
            <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
              <Link href="/student" className="group">
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      <Users className="w-6 h-6 mr-2" />
                      Student
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Mark your attendance and view your attendance history with
                    ease.
                  </CardContent>
                </Card>
              </Link>
              <Link href="/lecturer" className="group">
                <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      <UserCheck className="w-6 h-6 mr-2" />
                      Lecturer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Manage class sessions and view comprehensive student
                    attendance data.
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                AttendEase
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Simplifying attendance, one class at a time.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            © 2023 AttendEase. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
