# ---- Build stage ----
    FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
    WORKDIR /src
    
    # copy csproj and restore first (leverages Docker cache)
    COPY ./ .
    RUN dotnet restore "GroceryListApi.csproj"
    
    # build and publish
    RUN dotnet publish "GroceryListApi.csproj" -c Release -o /app/publish
    
    # ---- Runtime stage ----
    FROM mcr.microsoft.com/dotnet/aspnet:8.0
    WORKDIR /app
    COPY --from=build /app/publish .
    
    ENV ASPNETCORE_URLS=http://0.0.0.0:5003
    EXPOSE 5003
    ENTRYPOINT ["dotnet", "GroceryListApi.dll"] 