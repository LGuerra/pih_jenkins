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
      $.get(url)
        .then(response => {
          deferred.resolve();
        })
        .fail(() => {
          if (attempts > 0) {
            autoCallable(attempts-1);
          } else {
            deferred.reject();
          }
        })
    }, miliseconds)
  })(attempts);

  return deferred.promise();
}

let printInfo = url => {
  let anchor = document.createElement('a');
  anchor.href = url;
  anchor.click();
}

let downloadPDFReport = (url, dataTokens) => {
  let deferred = $.Deferred();
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
      return $.post(url)
    })
    .then(() => {
      return (_askForPDF(1000, 10, url));
    })
    .then(() => {
      printInfo(url);
      deferred.resolve();
    })
    .fail((error, msg) => {
      console.log('FAIL', error, msg);
    });

  return deferred.promise();
}

export default {
  printInfo,
  downloadPDFReport
};
