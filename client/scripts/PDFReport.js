let _buildPromises = (url, identifier, dataType, data) => {
  let promise;
  url += '/' + identifier;
  if (dataType === 'json') {
    promise = $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  } else {
    promise = $.ajax({
      url: url,
      type: 'POST',
      data: data
    });
  }

  return promise;
}

let _askForPDF = (miliseconds, attempts, url) => {
  let deferred = $.Deferred();

  (function autoCallable(attempts) {
    setTimeout(() => {
      fetch(url, {
        method: 'GET'
      })
      .then(response => {
        if (response.status !== 200) {
          if (attempts > 0) {
            autoCallable(attempts-1);
          } else {
            deferred.reject();
          }
        } else {
          deferred.resolve();
        }
      });
    }, miliseconds)
  })(attempts);

  return deferred.promise();
}

export function printInfo(url) {
  let anchor = document.createElement('a');
  anchor.href = url;
  anchor.click();
}

export function downloadPDFReport(url, dataTokens) {
  return new Promise((resolve, reject) => {
    let promises = dataTokens.map((token) => {
      return _buildPromises(
        url,
        token.identifier,
        token.dataType,
        token.data
      );
    });

    $.when(...promises)
      .then(() => {
        return fetch(url, {
          method: 'POST'
        });
      })
      .then(() => {
        return (_askForPDF(1000, 10, url));
      })
      .then(() => {
        printInfo(url);
        resolve();
      })
      .fail((error, msg) => {
        console.error('FAIL', error, msg);
      });
  });
}

