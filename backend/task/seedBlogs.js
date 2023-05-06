import { dbConnection, closeConnection } from "../config/mongoConnection.js";

import articles from "../data/articles.js";

const db = await dbConnection();
await db.dropDatabase();

const blogs = [
  //java blogs
  {
    title: "Introducing the Java SE Subscription Enterprise Performance Pack",
    content:
      "Oracle is pleased to announce the availability of the Java SE Subscription Enterprise Performance Pack (Enterprise Performance Pack).  The Enterprise Performance Pack makes available to JDK 8 users the significant memory management and performance improvements brought to Java in the 7 years between the releases of JDK 8 and JDK 17.  These include modern garbage collection algorithms, compact strings, enhanced observability, and dozens of other optimizations. \n\n Enterprise Performance Pack supports headless Linux 64-bit workloads on both Intel and Arm-based systems like Ampere Altra.\n\nCustomers using the Enterprise Performance Pack will see immediate benefits on JDK 8 workloads running at or near memory or CPU capacity.  Testing on Oracle's own products and cloud services shows improvements in both memory and performance of heavily loaded applications of approximately 40%.  Even JDK 8 applications not running near capacity may see up to a 5% performance improvement.\n\nWhile many of the improvements included in the Enterprise Performance Pack will be gained with the default options, we recommend studying the documentation to maximize your performance and minimize memory utilization.  For example to improve application responsiveness by enabling the scalable low-latency ZGC garbage collector requires passing the -XX:+UseZGC option.",
    tags: ["java", "developer"],
    isPremium: false,
  },
  {
    title: "Java Concurrency: Condition",
    content:
      "Previously we checked on ReentRantLock and its fairness. One of the things we can stumble upon is the creation of a Condition. By using Condition we can create mechanisms that allow threads to wait for specific conditions to be met before proceeding with their execution.\n\nPreviously we checked on ReentRantLock and its fairness. One of the things we can stumble upon is the creation of a Condition. By using Condition we can create mechanisms that allow threads to wait for specific conditions to be met before proceeding with their execution.\n\nAlso Condition uses the underlying lock mechanisms, for example signal and signalAll will use the underlying Queue of the threads that is maintained by the Lock and will notify them to wake up.\n\nOne of the obvious things to implement using Conditions is a BlockingQueue. Worker threads processing data and publisher threads dispatching data. Data are published on a queue, worker threads will process data from the queue and then they should wait if there is no data in the queue.",
    tags: ["java", "back-end"],
    isPremium: true,
  },
  {
    title: "An Introduction to Java Module With Example",
    content:
      "Java Module is a feature introduced in Java 9 to improve the maintainability, scalability, and security of Java applications. A module is a collection of Java packages and resources that are grouped together and can be treated as a single unit of deployment, distribution, and execution.\n\nBefore Java 9, Java applications were organized using the Java classpath, which was a flat namespace that allowed all classes to access each other without any restrictions. This made it difficult to manage dependencies, prevent naming conflicts, and ensure that only required classes were loaded at runtime. Java Module addresses these issues by introducing the concept of module boundaries, which restricts access to classes and resources within a module unless explicitly exposed.\n\nA Java module is defined by a module descriptor file (module-info.java) that specifies the module's name, version, dependencies, and exported packages. A module can require other modules to function correctly and can export packages that are intended to be used by other modules. This allows for better control over dependencies, reduces the risk of conflicts, and improves the security of the application.\n\nJava modules also provide a way to optimize the size and performance of Java applications by allowing the JVM to load only the required modules at runtime. This can help reduce the startup time, memory usage, and overall footprint of the application. By adopting Java modules, developers can improve the maintainability, scalability, and security of their applications and stay up to date with the latest best practices in Java development.",
    tags: ["java", "developer"],
    isPremium: false,
  },
  {
    title: "Methods To Convert InputStream to String In Java",
    content:
      "In Java, an InputStream is a common way to read data from a source, such as a file or network connection, in a stream-oriented way. Often times, it is necessary to convert an InputStream to a String to perform further processing on the data or to display it to the user\n\nInputStream is an abstract class in Java that provides a common interface for reading data from different input sources, such as files, network connections, and other input streams. The primary purpose of InputStream is to provide a unified way to access input data regardless of its origin\n\nThe InputStream class provides several methods for reading data from the input source, including read(), read(byte[]), and skip(). Subclasses of InputStream implement these methods to provide specific behavior for reading data from a particular type of input source.\n\nSome common subclasses of InputStream in Java include FileInputStream (for reading data from a file), ByteArrayInputStream (for reading data from an in-memory byte array), and BufferedInputStream (for buffering input data to improve performance).\n\nIn general, an InputStream is used to read data from a source, while an OutputStream is used to write data to a destination. Together, they provide a powerful and flexible way to handle input/output operations in Java.",
    tags: ["java", "front-end"],
    isPremium: false,
  },
  {
    title: "Java Static Synchronized method behavior",
    content:
      "In our earlier post, we learnt that when a method is synchronized, only one thread will be allowed to enter the method. In this post, let's discuss the behavior of static synchronized methods.\n\n Multiple static synchronized methods in a same object example: To facilitate our study, I have put-together an interesting program. In this program, we are trying to simulate two threads trying to execute two static synchronized methods at the same point in time.\n\nHow do two static Synchronized methods work in Java?\n\nThread behavior of static synchronized methods?\n\nTo confirm this theory, we executed the above program and captured thread dump using open-source script yCrash. We analyzed the thread dump using the fastThread tool. Here is the generated thread dump analysis report of this simple program. Below is the excerpt from the thread dump analysis report",
    tags: ["java", "programming", "front-end", "back-end", "full-stack"],
    isPremium: true,
  },
  {
    title: "Java Modules: An Introduction",
    content:
      "Java modules were introduced in Java 9 to enhance the modularity of the Java platform. A module in Java is a collection of related packages, classes, and resources that can be packaged and deployed as a single entity. Modules are designed to help developers create more maintainable and scalable applications by improving encapsulation and reducing dependencies.\n\nModules define a set of exported and non-exported packages, as well as a set of dependencies on other modules. Exported packages are visible to other modules, while non-exported packages are only accessible within the module itself. This enables developers to limit the visibility of their code and reduce the risk of conflicts with other modules\n\nModules are declared using the module-info.java file, which is located in the root directory of a module. This file specifies the module name, the packages it exports, and the modules it depends on\n\nTo use a module in Java, you need to add it to the module path, which is a list of directories that contain modules. The module path is separate from the classpath, which is used to locate classes and resources.",
    tags: ["java", "testing", "development"],
    isPremium: true,
  },
  {
    title: "Intro To Java Virtual Threads",
    content:
      "Java Virtual Threads is a new feature introduced in Java 19 that allows developers to create lightweight threads, also known as fibers, that can run concurrently within a single operating system thread. This can improve the scalability and efficiency of Java applications, particularly those that need to handle a large number of client connections or concurrent requests.\n\nVirtual threads are implemented using a technique known as Continuation Passing Style (CPS). CPS is a programming paradigm that involves passing the control flow of a program between different sections of code, rather than relying on a central thread of execution. This allows virtual threads to be created and managed more efficiently than traditional threads. You can also check this article for more details.\n\nDiferrences Between Virual Threads and Java Threads:\n\nVirtual threads are distinct from traditional Java threads in several ways. First, they are created using a new API called the VirtualThreadFactory, which provides a simplified interface for managing and scheduling virtual threads. Second, they have much lower memory overhead compared to traditional threads, making it possible to create many more of them without exhausting system resources. Finally, they are designed to work seamlessly with existing Java code, so developers can start using virtual threads without having to rewrite their entire application.\n\nTo create a virtual thread, you can use the VirtualThreadFactory class, which provides several factory methods for creating virtual threads with different characteristics. For example, you can create a virtual thread that executes a Runnable or Callable task, or one that runs indefinitely until it is explicitly stopped.",
    tags: ["java", "programming", "development", "testing"],
    isPremium: true,
  },
  {
    title: "Java and dynamic Proxies",
    content:
      "Dynamic proxies in Java is a simple and very useful feature.\n\nUsually we create an interface implementation and then compilation is involved. With dynamic proxies we can implement a list of interfaces at runtime. A proxy object will be created, when a method is invoked on that proxy instance, the methods invoked will be forwarded to an invocation handler specified.\n\nThis can have various usages. A common use case would be for a java interface which we can use a proxy and intercept the calls to the methods invoked.\n\nSupposing we have a JDBC connection pool and we want to have something like a micrometer counter. On getting a connection the counter will increase, thus we can identify the rate of acquiring connections in our application.\n\nWe can examine the DataSource interface of Java on the source code. We can see the method of interest, getConnection, present.\n\nInstead of creating an interface implementation and having to implement all those methods and then delegate them to the actual DataSource instance, we shall instead use a proxy and add actions only to the method of interest, in our case getConnection.\n\nLet's break it down.\n\nThe invocation handler will be called for the method of an interface specified. When an interface method is invoked it is our choice how we shall handle it. In our case we shall print a simple message and then we shall execute the corresponding method to our target instance.\n\nAlso we have a static factory specified which shall proxy the object implementing the interface of interest. A new proxy instance will be created, it will implement the interfaces provided and the calls towards the proxy instance will be passed to the handler we provided.",
    tags: ["java", "front-end", "back-end"],
    isPremium: false,
  },
  {
    title: "Avoid leaking domain logic",
    content:
      "Many software architectures try to separate domain logic from other parts of the application. To follow this practice we always need to know what actually is domain logic and what is not. Unfortunately this is not always that easy to separate. If we get this decision wrong, domain logic can easily leak into other components and layers.\n\nWe will go through this problem by looking at examples using a hexagonal application architecture. If you are not familiar with hexagonal architecture (also called ports and adapters architecture) you might be interested in the previous post about the transition from a traditional layered architecture to a hexagonal architecture.\n\nAssume a shop system that publishes new orders to a messaging system (like Kafka). Our product owner now tells us that we have to listen for these order events and persist the corresponding order in the database.\n\nUsing hexagonal architecture the integration with a messaging system is implemented within an adapter. So, we start with a simple adapter implementation that listens for Kafka events:\n\nIn case you are not familiar with the @AllArgsConstructor annotation from project lombok: It generates a constructor which accepts each field (here saveOrderUseCase) as parameter.The adapter delegates the saving of the order to a UseCase implementation.UseCases are part of our domain core and implements domain logic, together with the domain model. Our simple example UseCase looks like this:",
    tags: ["java", "proggraming"],
    isPremium: false,
  },
  {
    title: "Performance impact of java.lang.System.getProperty()",
    content:
      "java.lang.System.getProperty() is a common API used by Java developers to read the System properties that are configured during application startup time. i.e. when you pass “-DappName=buggyApp” as your application's startup JVM argument, the value of the 'appName' system property can be read by invoking the java.lang.System.getProperty(). Example:\n\nWhen the above method is invoked,buggyApp will be returned. However, if java.lang.System.getProperty() is used in a critical code path, it has a potential to degrade the applications performance. In this post lets discuss what is the performance impact of invoking java.lang.System.getProperty(), how to mitigate it and a real-world production problem triggered by this API.\n\nWhat is the performance impact of using ‘java.lang.System.getProperty()' API?\n\n",
    tags: ["java", "back-end"],
    isPremium: true,
  },
  //java script react
  {
    title: "Custom hooks in React-js",
    content:
      "Welcome readers, in this tutorial, we will create a custom hooks in a React-js application.\n\nIntroduction:\n\nReact is a flexible javascript library responsible for building reusable UI components. It is an open-source component-based frontend library responsible only for the view part of an application and works in a virtual document object model. A custom hook in React-js is a javascript function whose name starts with the “use” keyword. Custom hooks in React-js are used to remove the duplicated logic in the component and we can extract that logic to a custom hook.\n\n Setting up dependencies:\n\nTo play with react let us set up some of the required dependencies.\n\nSetting up Node.js\n\nTo set up Node.js on windows you will need to download the installer from this link. Click on the installer (also include the NPM package manager) for your platform and run the installer to start with the Node.js setup wizard. Follow the wizard steps and click on Finish when it is done. If everything goes well you can navigate to the command prompt to verify if the installation was successful ",
    tags: ["react", "front-end", "web-development", "javascript"],
    isPremium: false,
  },
  {
    title: "Using React Context Hook",
    content:
      "Welcome readers, in this tutorial, we will understand how to use the Context Hook in a React-js application.\n\nIntroduction:\n\nReact is a flexible javascript library responsible for building reusable UI components. It is an open-source component-based frontend library responsible only for the view part of an application and works in a virtual document object model. But before that let us take a look at the differences between angular and react \n\nUse Context hook in React-js\n\nHooks in React-js are the functions that are hooked into react-js state and lifecycle features from function components. The useContext(…) allows the components to access global data and re-render when that global data is changed. It helps to solve the drilling problem when we have to pass props from parents to children components. It helps to remove the complex nesting",
    tags: ["react", "front-end", "web-development", "javascript"],
    isPremium: false,
  },
  {
    title: "How to close a React Native modal with a button",
    content:
      "I've been working with React Native lately, and I've come across a few unimplemented features I needed to add to the basic components. One of those components is the React Native Modal component that is used to show a view above another one. It doesn't promise more features than that, but it can be very useful to implement your own popup.\n\nOn the other hand, since it's only a simple modal, it does not include everything you would expect for a popup component like an X to close it, or closing the modal when you tap beside it. I'll be walking you through how to add those two features when you're starting from a Modal component.\n\nFirst, we have to add the button itself so we can then use it to close the popup. In that case, I wanted to add a small X in the top right corner of the popup, but it could be anywhere else.\n\nGiven how the positioning work, there are two options for this:\n\nPositioning absolutely the button in the top right corner. You can then do anything you want for the rest of the content, but then you run the risk of having the content overlapping the X since it's out of the normal layout flow. If you want to use the space beside and under the button at the same time, it's pretty much impossible, which leads us to the second option.\n\nPositioning the button with flexbox, leaving space to the left of the button for a header. You can then fill in the header and the content at the bottom separately. If you're doing something that's meant to be a popup, having a title is also a pretty standard feature.",
    tags: ["react", "web-development", "javascript"],
    isPremium: true,
  },
  {
    title: "ReactJS File Upload Example",
    content:
      "In this article we build a File Upload Feature using ReactJS. ReactJS has gained ground and has become the go to library for Front end Development. We take a look at how to build a feature to upload files in a ReactJS Application. We will use the ubiquitous XMLHttpRequest Object to post the file data to the server. Also, we will build a simple Server side API to accept the uploaded file. To make things interesting we also provide a progress indicator.\n\ncreate-react-app is a command line tool from the folks who created React. This tool allows us to quickly generate the skeletal or structure upon which we can build a full blown ReactJS Application. We use it here to create the starting point of our example. We use Node.js to build a simple API which allows us to post the file we want to upload. Node.js is basically JavaScript on the server side. The formidable npm package allows us to parse and save the uploaded file. Concurrently package will allow us to launch both our client side as well as server side code simultaneously.",
    tags: ["react", "front-end", "web-development", "javascript"],
    isPremium: false,
  },
  //python
  {
    title: "How To Use Playwright For Web Scraping with Python",
    content:
      "In today's data-driven world, the ability to access and analyze large amounts of data can give researchers, businesses & organizations a competitive edge. One of the most important & free sources of this data is the Internet, which can be accessed and mined through web scraping.\n\nWeb scraping, also known as web data extraction or web harvesting, involves using code to make HTTP requests to a website's server, download the Content of a webpage, and parse that Content to extract the desired data from websites and store it in a structured format for further analysis.\n\nWhen it comes to data extraction & processing, Python has become the de-facto language in today's world. In this Playwright Python tutorial on using Playwright for web scraping, we will combine Playwright, one of the newest entrants into the world of web testing & browser automation with Python to learn techniques for Playwright Python scraping.\n\nThe reasons for choosing Playwright over some popular alternatives are its developer-friendly APIs, automatic waiting feature, which avoids timeouts in case of slow-loading websites, superb documentation with examples covering various use cases, and a very active community.\n\n",
    tags: ["python", "web-development", "front-end"],
    isPremium: false,
  },
  {
    title: "Building a Distributed Task Queue in Python",
    content:
      "Why not just use Celery/RQ/Huey/TaskTiger?\n\nUnfortunately, WakaTime has been using Celery for almost 10 years now. During that time I've experienced many critical bugs, some still open years after being introduced. Celery used to be pretty good, but feature bloat made the project difficult to maintain. Also in my opinion, splitting the code into three separate GitHub repos made the codebase hard to read.\n\nIf you use Celery delayed tasks, as your website grows eventually you'll start seeing this error message:\n\nWhen that happens the worker stops processing all tasks, not just delayed ones! As WakaTime grew, we started running into this bug more frequently.\n\nI tried RQ, Huey, and TaskTiger, but they were missing features and processed tasks slower than Celery. A distributed task queue is indispensable for a website like WakaTime, and I was tired of running into bugs. For that reason, I decided to build the simplest distributed task queue possible while still providing all the features required by WakaTime.\n\nIntroducing WakaQ\n\nWakaQ is a new Python distributed task queue. Use it to run code in the background so your website stays fast and snappy, and your users stay happy.\n\nIt only took one week from the first line of code until fully replacing Celery at WakaTime. That says something about it's simplicity.",
    tags: ["python", "web-development", "back-end"],
    isPremium: false,
  },
  {
    title:
      "Understanding Selenium Python Bindings for effective Test Automation",
    content:
      "With many apps being developed at a rapid pace, testing and releasing the apps is starting to become a challenge. However, with the use of various rapid automation techniques and automation tools like Selenium, testing teams are able to test early, resolve issues and release apps faster. Selenium automation has proven to be an excellent tool to automate test cases for faster app testing. Selenium and Python make a formidable pact to accelerate testing of web apps. The Selenium Python Bindings helps provide a simple API to write functional/acceptance tests for the Selenium WebDriver. Let us dig a little deeper to learn more about Selenium, Python and language binding to understand the concept a little better.\n\nWhat is Selenium?\n\nSelenium is a popular open source automation framework that is used to automate your web app testing. It is used to validate web applications across various browsers like IE, Firefox, Chrome, etc. The framework even supports various programming languages like C#, Python, Java, etc. Selenium is not just a single tool but a test suite that comprises various tools that ease up the automation process of testing web applications. There is a dire need to scale up testing your web application and website, and Selenium fulfills this need through selenium webdriver python bindings.\n\nSelenium Remote Control or Selenium RC, was introduced to tackle the problem of installing the application and the Selenium Core to perform the testing activities. Selenium RC was created to act as a HTTP proxy to overcome the tedious task of installing the entire application that needs to be tested and the Selenium core on the local machine. Now with the help of Selenium RC users can use various programming languages to automate their web app testing efforts. Selenium RC is also called Selenium 1.\n\nSelenium IDE\n\nSelenium Integrated Development Environment (IDE), is a simple framework that is part of the Selenium Test Suite. It is a firefox extension that can be used to automate the browser through the record and playback feature. You can easily install and use this plugin for building some basic test cases. For more complex and complicated test cases it is advisable to use Selenium RC or WebDriver.\n\n Selenium Grid\n\nSelenium Grid was developed by Patrick Lightbody to minimize the number of test executions in app automation. Selenium Grid can be used with Selenium RC to execute tests across different machines and browsers parallely at the same time. Selenium Grid is great for parallel test executions. \n\nSelenium WebDriver\n\nSelenium WebDriver is another framework within the Selenium test suite to automate different browser actions across different browsers. Unlike the Selenium RC or Selenium IDE, Selenium WebDriver uses a modern and stable approach to automate the browser actions while performing testing. It is also not restricted to any particular programming language and supports Java, C#, PHP, Python, Perl, and Ruby. It controls the browser by directly connecting with it from the system itself. \n\nWhat is Python?\n\nPython is a high-level programming language with diverse functions and dynamic semantics. It is used for various tasks such as website building, software development, data analysis and automation scripting. Python is a general purpose programming language that can be used for multiple tasks and solving problems. It is the most widely used programming language because of its beginner friendliness, easy to learn aspects. Python is used as the go-to programming language for writing automation scripts in the QA space. While there are a lot of ways that Python can be used in app testing, we will specifically look at Python binding for Selenium.      ",
    tags: ["python", "front-end", "web-development"],
    isPremium: true,
  },
  {
    title: "Diagrams as Code with Python",
    content:
      "In my career I have noticed that often organizations are reluctant on providing Engineering teams with licenses for software to draw diagrams. In the best case scenarios MS Visio is usually the only option available, which isn't the best experience when trying to draw modern software architectures. Several online options are available, but they require to share project details that cannot leave your organization network, so they couldn't be taken into account often. Also, while treating everything as code, it would be nice to have also diagrams as code. All these needs can be satisfied by adopting Diagrams. It is an Open Source Python package that allows you draw cloud system architecture diagrams programmatically and then put them under version control, (as at the end they are regular Python files). It supports cloud (AWS, Azure, GCP, Alibaba, Oracle) and on-prem system architecture diagrams. The Diagrams nodes include also Kubernetes, programming languages and frameworks.\n\nDiagrams supports Python 3.6+ and requires the Open Source Graphviz visualization software for the rendering. Once Graphviz has been installed, Diagrams can be obtained through PyPI or Anaconda.Diagrams is intuitive to use and it is based on the following concepts:\n\nDiagram: self-explaining :)\n\n      Node: a single system component object.\n\n      Cluster: a local cluster context.\n\n      Edge: a connection between nodes. They come with several additional properties.\n\nThe official Diagrams documentation is comprehensive, so I am not going to deep dive into available components, but I am going to show a concrete code example to generate a diagram for a generic AWS serverless data integration hub:     ",
    tags: ["python", "front-end", "web-development"],
    isPremium: false,
  },
  {
    title: "Python main function Example",
    content:
      "Hello, in this tutorial, we will learn about the main function in the Python programming language.\n\nIntroduction\n\nThe main function in python programming is the starting point of a program. The python interpreter runs the code sequentially. The main function in python programming gives the program a starting point for the execution and is useful to better understand how the program works. A simple python program looks like this ",
    tags: ["python"],
    isPremium: true,
  },
  {
    title: "What Is a Dictionary in Python?",
    content:
      "As I continue to write about Python, I find myself wanting some sort of place to direct my readers to learn some of the more fundamental programming concepts. For instance, I write a lot about Python dictionaries, but I don’t actually explain what a dictionary is to the level of detail that some of my readers might like. As a result, thought it would be fun to put together an in-depth article which answers the question: what is a dictionary in Python?\n\nA dictionary is a list-like data structure where the indices are replaced by keys. In other words, rather than looking up values by their numerical index, a dictionary allows us to use immutable data types as keys. As a result, keys like strings, integers, and tuples can be mapped to any type of data we want.\n\nIn the remainder of this article, we’ll take a look at dictionaries in more detail. Specifically, we’ll take some time to look at the structure of a dictionary. Then, we’ll look at dictionary syntax and methods. After that, we’ll look at few scenarios where a dictionary might be useful, and we’ll close things out with some frequently asked questions.\n\nPython Dictionary Overview\n\nIn Python, a dictionary is a data structure that stores pairs of items. Specifically, each pair consists of two items: a key and a value.In this context, a key is an immutable data type which serves as the access point for its associated value. For example, in a language dictionary—the kind that stores terms and definitions—the terms would be keys and the definitions would be values:\n\nPython Dictionary Syntax\n\nNow that we’re comfortable with the concept of a dictionary, let’s take a look at a few things we can do with them. In particular, we’ll take some time in this section to focus on the syntax for initializing a dictionary as well as adding, removing, and looking up values.",
    tags: ["python", "front-end", "back-end", "programming", "developer"],
    isPremium: false,
  },
];

const createBlogs = async (x) => {
  await articles.createArticle(x);
};
async function main() {
  try {
    await Promise.all(
      blogs.map(async (x) => {
        await createBlogs(x);
      })
    );
  } catch (e) {
    console.log(e);
  }
}

await main();
await closeConnection();
