using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RoomMate.Domain;
using RoomMate.Domain.Services.Implements;
using RoomMate.Domain.Services.Interfaces;
using RoomMate.Repository;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore.Mvc;
using SimpleInjector.Lifestyles;
using System;

namespace RoomMate.Api
{
    public class Startup
    {
        private Container container = new Container();

        public Startup(IHostingEnvironment env)
        {
            // ASP.NET default stuff here
        }

        // This method gets called by the runtime.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                // Set a short timeout for easy testing.
                options.IdleTimeout = TimeSpan.FromSeconds(10);
                options.Cookie.HttpOnly = true;
                // Make the session cookie essential
                options.Cookie.IsEssential = true;
            });



            services.AddCors(options => options.AddPolicy("Cors", builder =>
            {
                builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            }));
            //login cookies

            //services.AddAuthentication(options => {
            //    options.DefaultScheme = "Cookies";
            //}).AddCookie("Cookies", options => {
            //    options.Cookie.Name = "auth_cookie";
            //    options.Cookie.SameSite = SameSiteMode.None;
            //    options.Events = new CookieAuthenticationEvents
            //    {
            //        OnRedirectToLogin = redirectContext =>
            //        {
            //            redirectContext.HttpContext.Response.StatusCode = 401;
            //            return Task.CompletedTask;
            //        }
            //    };
            //});

            //^

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();





            services.AddMvc();


            IntegrateSimpleInjector(services);
        }

        private void IntegrateSimpleInjector(IServiceCollection services)
        {
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton<IControllerActivator>(
                new SimpleInjectorControllerActivator(container));
            services.AddSingleton<IViewComponentActivator>(
                new SimpleInjectorViewComponentActivator(container));

            services.EnableSimpleInjectorCrossWiring(container);
            services.UseSimpleInjectorAspNetRequestScoping(container);
        }

        // Configure is called after ConfigureServices is called.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //pajet   
            //if (env.IsDevelopment())
            //    app.UseDeveloperExceptionPage();
            //else
            //    app.UseHsts();
            //app.UseHttpsRedirection();
            //app.UseStaticFiles();
            //app.UseCookiePolicy(new CookiePolicyOptions
            //{
            //    MinimumSameSitePolicy = SameSiteMode.Strict,
            //    HttpOnly = HttpOnlyPolicy.Always,
            //    Secure = CookieSecurePolicy.Always
            //});

            //if (env.IsDevelopment())
            //    app.UseCors(x => x
            //        .WithOrigins("https://localhost:3000")
            //        .AllowCredentials()
            //        .AllowAnyMethod()
            //        .AllowAnyHeader());


            //moje
            InitializeContainer(app);
            container.Verify();
            //app.UseCors(builder => builder.AllowAnyOrigin());

            app.UseCors("Cors");
            // ASP.NET default stuff here
            //login cookies
            app.UseCors(policy =>
            {
                policy.AllowAnyHeader();
                policy.AllowAnyMethod();
                policy.AllowAnyOrigin();
                policy.AllowCredentials();
            });

            app.UseAuthentication();

            //app.UseCookieAuthentication(new CookieAuthenticationOptions()
            //{
            //    AuthenticationScheme = "PutANameHere",
            //    LoginPath = new PathString("/Account/Login/"),
            //    AutomaticAuthenticate = true,
            //    AutomaticChallenge = true
            //});

            //
            //login v2 cookies obsolete
            //app.UseCookieAuthentication(options =>
            //{
            //    options.AutomaticAuthenticate = true;
            //    options.AutomaticChallenge = true;
            //    options.LoginPath = "/Home/Login";
            //});
            app.UseSession();
            app.UseMvc();
        }

        private void InitializeContainer(IApplicationBuilder app)
        {
            // Add application presentation components:
            container.RegisterMvcControllers(app);
            container.RegisterMvcViewComponents(app);

            // Add application services. For instance:
            container.Register<RoomMateContext>(Lifestyle.Scoped);
            container.Register<DbContext, RoomMateContext>(Lifestyle.Scoped);
            container.Register(typeof(IRepository<>), typeof(Repository<>), Lifestyle.Scoped);


            //// Tutaj dodawać nowe serwisy
            /// TODO: Dodać automat na to, żeby przeszło klasy dziedziczące po Serwisie
            container.Register<IFlatService, FlatService>(Lifestyle.Scoped);
            container.Register<IHouseworkService, HouseworkService>(Lifestyle.Scoped);
            container.Register<ILoginService, LoginService>(Lifestyle.Scoped);
            container.Register<IRegisterService, RegisterService>(Lifestyle.Scoped);


            // Allow Simple Injector to resolve services from ASP.NET Core.
            container.AutoCrossWireAspNetComponents(app);
        }
    }
}
