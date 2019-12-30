const  router = require('express').Router(),
       startCrawler = require('../crawler/crawler')



router.post('/rooms', async (req, res) => {

  var params = req.body

  var response = await startCrawler(params)


  if (!response) {
    res.status(400).json({
      error: 'Dados Inválidos'
    })
  } else if (response.length == 0) {
    res.status(200).json({
      results: 'Nenhum resultado foi encontrado'
    })
  } else {
    res.status(200).json({
      results: response
    }
    )
  }
})

module.exports = router
