/*
 * Copyright 2010-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    var endpoint = 'https://pih-api.intelimetrica.com/v1/dev';
    var parser = document.createElement('a');
    parser.href = endpoint;

    //Use the protocol and host components to build the canonical endpoint
    endpoint = parser.protocol + '//' + parser.host;

    //Store any path components that were present in the endpoint to append to API calls
    var pathComponent = parser.pathname;
    if (pathComponent.charAt(0) !== '/') { // IE 9
        pathComponent = '/' + pathComponent;
    }

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.modelValuationPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var modelValuationPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/model/valuation').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(modelValuationPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.modelValuationOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var modelValuationOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/model/valuation').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(modelValuationOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.similarsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var similarsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/similars').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(similarsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.similarsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var similarsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/similars').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(similarsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.stadisticsPriceDistributionPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var stadisticsPriceDistributionPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/stadistics/price-distribution').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(stadisticsPriceDistributionPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.stadisticsPriceDistributionOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var stadisticsPriceDistributionOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/stadistics/price-distribution').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(stadisticsPriceDistributionOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.stadisticsTypologyDistributionPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var stadisticsTypologyDistributionPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/stadistics/typology-distribution').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(stadisticsTypologyDistributionPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.stadisticsTypologyDistributionOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var stadisticsTypologyDistributionOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/stadistics/typology-distribution').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(stadisticsTypologyDistributionOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbAdajacentSuburbsGeojsonsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_col'], ['body']);
        
        var suburbAdajacentSuburbsGeojsonsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/adajacent-suburbs-geojsons').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_col']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbAdajacentSuburbsGeojsonsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbAdajacentSuburbsGeojsonsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbAdajacentSuburbsGeojsonsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/adajacent-suburbs-geojsons').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbAdajacentSuburbsGeojsonsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbAdjacentSuburbsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_col'], ['body']);
        
        var suburbAdjacentSuburbsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/adjacent-suburbs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_col']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbAdjacentSuburbsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbAdjacentSuburbsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbAdjacentSuburbsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/adjacent-suburbs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbAdjacentSuburbsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbAverageM2Get = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_col'], ['body']);
        
        var suburbAverageM2GetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/average-m2').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_col']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbAverageM2GetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbAverageM2Options = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbAverageM2OptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/average-m2').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbAverageM2OptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbAverageOfferGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_col'], ['body']);
        
        var suburbAverageOfferGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/average-offer').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_col']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbAverageOfferGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbAverageOfferOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbAverageOfferOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/average-offer').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbAverageOfferOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbAverageTimeGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_col'], ['body']);
        
        var suburbAverageTimeGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/average-time').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_col']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbAverageTimeGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbAverageTimeOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbAverageTimeOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/average-time').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbAverageTimeOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbCentroidGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_col'], ['body']);
        
        var suburbCentroidGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/centroid').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_col']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbCentroidGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbCentroidOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbCentroidOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/centroid').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbCentroidOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbGeojsonGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_col'], ['body']);
        
        var suburbGeojsonGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/geojson').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_col']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbGeojsonGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbGeojsonOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbGeojsonOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/geojson').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbGeojsonOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbHistoricGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_col'], ['body']);
        
        var suburbHistoricGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/historic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_col']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbHistoricGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbHistoricOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbHistoricOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/historic').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbHistoricOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbInfoGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_col'], ['body']);
        
        var suburbInfoGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/info').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_col']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbInfoGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbInfoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbInfoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/info').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbInfoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbMonthlyListingGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_col'], ['body']);
        
        var suburbMonthlyListingGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/monthly-listing').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_col']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbMonthlyListingGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbMonthlyListingOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbMonthlyListingOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/monthly-listing').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbMonthlyListingOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbSemesterListingGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_col'], ['body']);
        
        var suburbSemesterListingGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/semester-listing').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_col']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbSemesterListingGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbSemesterListingOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbSemesterListingOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburb/semester-listing').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbSemesterListingOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbsInfoGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_cols'], ['body']);
        
        var suburbsInfoGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/suburbs/info').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id_cols']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbsInfoGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.suburbsInfoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var suburbsInfoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/suburbs/info').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(suburbsInfoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
