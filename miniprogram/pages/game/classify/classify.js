// miniprogram/pages/game/classify/classify.js
const db = wx.cloud.database({
  env: 'fit-gc46z'
});  //用db代替数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //设备宽高
    windowHeight:'',
    windowWidth:'',
    openid:'',
    _id:'',
    show: false,
    //图片
    heiban:'https://6669-fit-gc46z-1304760622.tcb.qcloud.la/classify/heiban.png?sign=861bfac560e58856f7d928a33e5a0faf&t=1616589394',
    backImg:'https://6669-fit-gc46z-1304760622.tcb.qcloud.la/classify/zhuozi.png?sign=c48fae9669b11d72ee779a3f29470bfe&t=1616589427',
    left:'data:image/png;base64,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',
    right:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQVR4Xu19C7RdVXnu/8+9w8lBiom0UHVYHCCKjFYePmrzOmvOfUJIWhD0GnyUiFZ8Ya3RGi/YirT3whWvaH20VREhXLxFriWSNhBy9pzrnDy0Sq2xvV7kNaQOuBeKJaGYk5OcPf87frICITk52XPOtdZea++5xsggGcx//v/85vz2XHPN/4EQn4hAROCwCGDEJiIQETg8ApEgcXVEBGZBIBIkLo+IQCRIXAMRAT8E4g7ih1uUGhAEIkEGZKLjMP0QiATxwy1KDQgCkSADMtFxmH4IRIL44RalBgSBSJABmeg4TD8EIkH8cItSA4JAJEiJE71hw4ahY4455thGo3Hs7t27ny+EOJaIjkXEp//w39kcRHySiJ7+w3+31j45d+7cnZ1O58mnnnrqyRUrVkyVaPZAq4oEyXn6N27c+Ly5c+e+HABOsda+HBFPIaKn/w0Ax+Wk7hcAcB8i3ktE9wkh7uV/7969+95ly5b9MicdsRv+sYoohCGQpulrrbVLEXEpEwERXxTWY5g0ET2SEWeTEGJTkiQ/COtxsKUjQRznX2t9uhBiARGNAMDZADDfsYuymz8BAHch4ri1dptSanvZBtRZXyTIEWaPzw3Dw8PnE9HZiLgAAE6t84QDwD1EtA0R75qcnFwXzzOzz2YkyGHwMcYsQsQLAIDJcVLNSTGj+Yj4IACsI6LbpJRb+nGMoWOKBDkAwU2bNp3UaDTOz4ixKBTcmslvYaJ0Op11S5cuZeLEJx7S962Bdrt9gRDiQt4tAGBowFcGf0JeZ629pdVq3TbgWAzuVyw+WwwNDa0SQqwCgEHbLbpd91ustWunpqbWDupZZeBesdrt9osRcRX/6YMDd7cLPbQdH+zX8p9Wq/VwaGd1kh8YgmSfZ1cRERPjV+s0SRWy9XFEXMu7yqB8Lu57gmzZsuVXpqenLyOiyyq00GpvCiJe3Ww2r160aNF/1H4wswygrwlijOGDNxPj9H6exB6OjS8dr5ZS3tJDGwpV3ZcEMcacioi8a/DrVBWehxDxAWvtA4j4EADsEEI80el0dhDRjmaz+cTk5OSOoaEhvvWGqamp+cPDw/Omp6fnI+K8RqMxz1rLN/bziOhEIcTJRHQyAJxYhcHxaxcRMVHuqYI9edrQdwTRWn+EydGLcwYiPgIAY9bafwQAJsMDAHC/lHI6z0nb35cxpgkAL8vIcrIQ4tUAMEpEvfAHe5xJopS6toix9qrPviGI1nohIl4JAK2ywETESSYEEWkASKWUPypL92x6jDFnAECCiCojzHCJdrWJ6Aql1NYSdRamqi8IYoy5lIiuQcSjC0Pq2Y75FWk93y9mpNhRgk5vFcaYeUyW7Ifj3DJey4hoFyKukVJ+2dvwigjWmiCbN2+ePz09fQ0AvLtIPIlopxDidiYGEa2XUu4uUl9RfRtj5iIik+Rca+15iPj8onRl/V7XbDbXLF68+OmzVR2f2hIkTVPJuwYAvKZA4HmnuL3T6awfHR19tEA9pXc9NjZ2QqPRYLKcx4Qp0IC7eTdJksQUqKOwrmtJED6IAwC/UjUKQIZfmW4AgBurcqYoYIzP6TI7s7wDAC7mL2V56yOiDgCsqeMBvnYE0VqvRcSL8p5EAPiZtfZGIcQNUsqfFdB/5bs0xrzUWnuxEILJ8tK8DSaim5RSVfn03tXwakUQY8wGAFje1ci6b8Rfnm7kXUNKWekDd/dDCmuZHex5N2Gi8BexPJ87pJQr8uywyL5qQxCt9dYsoi8vPPi7/WeUUnyOic9hENBar0HEj+V5r8QRjUqphXUAvRYEMcb8MwD8Zl6AIuL11tprlFI/zavPfu5Ha/0KIcQaInpXjuP8Fynlb+XYXyFdVZ4gxph/BYCX5DT6rUKIa0ZGRviTbXwcERgfHz/PWrsGAPL69f+5lPI3HM0otXmlCWKM4TNB8Ld6RNxlrb0yvk7ls7b4tUsIcQUR5XExu1NKmfuXs3xGWuG8WMYYymOQiPjDTqezutVqTeTRX+xjHwLtdntJo9H4HBGdlQcmUspK/lhX0iit9aOIeHwo8Ij4zampqdXLli17LLSvKH8oAhs3bjx+aGiISfK2UHyI6DGl1Amh/eQtXzmC5HUgzxzm/ixvwGJ/hyKgtf5k5igaCk/lDu6VIogxZizUG5ddzq21q5VS3wqdrSjfPQJa65VCCN5NQl3t21LK0e41F9uyMgTRWn8LEd8cONztnU5n1ejo6I8D+4niHgiMjY29qtForA2N4CSiW5VSKz1MyF2kEgTJiRzfE0KsHBkZ+XnuKMUOu0ZgfHz8JdZa3r1f37XQDA2rQpKeEyQn3yoOVpIhExJl80XAGMPeuxyH4v1UwXerpwTJwmM/643gPsE7pZR5+2cFmhTFGQFjzB0AcE4IGkT00V56AfeMIBzPYa3dFOiy/iUp5R+GTECULRYBY8wXAeCDvlrYVV4IsbRX8SQ9IUgWCXhXSLBTliDgcl/go1x5CGitr8oSafgqvbvZbJ7di8jEnhDEGPO1kDBZIvqiUupDvmhHufIR0Fp/ARFDdvvrpJSXlG156QThBAsA8KWAgXLcxjsD5KNojxAwxnwji1r0teCDZSeCKJUgnJonKwfm6+T2bSnlf/JFN8r1HgFjzP8CgDf5WMLZUrjsXZkphUolSOBN+Xc7nc65o6OjXOE1PjVFYGxs7LhGo8HJMH7Hcwil3rSXRpCQT7rsPjI9Pb083pB7LqmKifGNe7PZvMPXLaXMT7+lEIRz5QLAZt+wTSK6MPpWVWyVB5rDvluI6Jv0+nEAWFxGLuBSCJKm6Y2+iaSjV27gSqyweIgXMCfMTpKEk0oU+hROkKwEwd/4jILjOZIkebuPbJSpBwJpmt4cEE/ylqJLLxRKEC5es3fvXn61cq7PwZGAU1NTy2OwUz0Wuq+VWdAVn0d8IhO3z5kzZ3GRRXwKJUiaplf5VHbiGPJOp7M8hsn6Lrt6yWXhu0wS58//XOkqSZLCPCoKIwjXBEREr3IARPTxmGChXos81Nos/9anffohojOKqplYGEHSNP0sEXEOXddnq5QylmV2Ra0P2htjtvikFELEa5Mk+WgREBRCEC61LITg3cO5mqwQ4g0xb1URU139PrO8W9/xsPRxa+0ZRZSoLoQgWuvLEPEq14FyxsMkSf7AVS627x8E0jT9uk8GRyK6XCl1dd5I5E6QDRs2DA0PD/PuwZeDLg/nyl00COlAudyAtfbfivjFcwG8im05zSki8quW69vHPZOTk2esWLFiKs9x5U6Qdrt9iRDiq65G9vvBfGJi4oWdTuevAGBkfw0OIuJCn7dJKTk5dHwyBHwP7Nba97RaLQ6lyO3JnSDGGL73cD1k/0hKeWZuo6pYRxMTEwunp6c1Ih41k2mIeJcQYvWSJUt+UjHTe2aOMeafPEovbJFSLs7T6FwJ0m63LxBC/K2HgaullJ/3kKu8yNatW4/fs2dPN+Xb/nej0VgZSbJvSo0xHwaAz7lOsLX2ja1W6zZXucO1z5Ugxhh2KbnQ0Tiu5nRmvxavSdP0O0TEdQC7eSJJMpSyIj68i7hWurpFSvmWbsDupk1uBNm0adNJzWaTXxGGulG8vw1nXW+1Wp9ykalLW631qxHxbkd7I0kywNrt9qc4i7wjflPT09OnLV269EFHuRmb50YQz3gPLm/Au0df1gTUWr8HEb/iMVGRJPtes3j34F3EqTxCnvEiuRHE83D+eSnlao8FVAsRYwzf6VznaWwkyT6S8DmEzyMuT26H9VwIYozhr1b89cr14d3Dy1/LVVEv2qdp+loi+n6A7oEnSVaimncR14cDqvg+JejJhSCeflfrpZTdHl6DBtkr4Y0bNz7vqKOO2g4AJwfYEEliDJfMO9cFw7z8s4IJwjfnRx999E+I6CSXAQDAJVJK39cPR1W9a56m6QVE5PPp+0CjB5okxph3A4DTBSAiPrhr167TQm/WgwniEzFIRDutta8YHR3t5n6gd6s7J83GGP4SE/qlbmBJMjY2doIQ4qeI6FqvMjjiMJggWuvrEdEpkRsi3pQkyaqc1l8tuknT9Eoi+mSgsQNLkjRN1xLRRS74EdE3lFJBpauDCWKMuQ8AXuZiOCKuTJLkVheZfmhrjPlzAPiTwLEMJEnSNH0zEblWDbtfSnlKCN5BBPH8SvMQe/pKKXeHGF5XWWPMfwGATwTaP3AkMcbMBYB7AOBEF+wQ8XVJkvzARebAtqEE+RgRXeOofOBLFuSQ7ZwhH0SSOJdSQMQ1SZJ8xnGNPtM8lCC3E5HT5zchxJtGRkZCv+r4jrcycsYYDu75z4EGDRRJxsfH32it/bYLZoi4PkkS7+uEIIIYY9hVxOXLwu6hoaEXL1iw4N9dBtmvbdM0/TQRrQkc38CQZNu2bS+Ympp6GAD4davbZ6eU0slVJZdXLM/b8zEp5dJuRzYI7YwxvP3/ceBYB4YkxphNAOBaJtr7Vt17B/FJG9nPnrshC9wY898BIDQrx0CQxMfDNyR9rTdBfKqYEtHrlVL/ELKY+lVWa30tIoY6bvY9SbTWv42I33NcB95VkL0JorV+GBFf5GDoo1LKX3doP3BNPT1XD8ap70lijPl/AHBCtwuEiB5RSr242/bBZ5DMCe8pR4U3Syl/31Fm4JqnafoXRBRaf7GvSWKM+R8A4JTUfM+ePccsW7bsl64LymsHGR8fP9Na+0MXZUT0R0qpL7jIDGrbNE2/QEQhBS8Zur4lidb6Q4j4Fy7rQwhx1sjIiLPbvC9BVlprnYqfENHvKaX+3mVQg9zWGMOFTrngacjTlyTRWv8uIv6dCzBCiAtHRkZcXVXAiyDGGPYnYr8il+eVZVQEcjGo6m211n+JiO8PtLPvSJJVLPs/jrj8qZSS3XycHi+CeFaMmiOlnHayLjbmkFNONve+QCj6iiTGmCYA7HXBxLcilRdBjDHfBYDXOxj4kJTSNX2LQ/f93VRr/RVEfE/gKPuNJJzow8Vx8XtSSufKur4E4SKKx3U7YYiokyRpdds+tjsUgTRNv0pElwRi0zckSdO0TUTKAY9fSCld8/26n0Gy5NROrupE9DWlVOgvoAMW/dnUGMMhyqHZ7/uCJFrrryKi0w/G5OTkXNcQXOcdZGJi4tc6nc5jjkvwT6SU/9VRJjafAQGfCM4Zuqk9SYwxHFPjdOhuNBrHL1my5N9cFpYzQbZu3Xrynj177ndRAgAflFJ+2VEmNj8MAsaYbwDAxYEA1Zokxhj+BM6fwrt+jjrqqJctXLjwga4FANxfsdrt9llCiH90USKEePvIyMg3XWRi29kR0FrfiIihcf21Jcn4+PjbrLU3u6wTa+2rW62W0wW38w5ijEk44Z2LYUT0u0qpDS4yse2REfBJZNAvr1ta6xWI6HrxLKWU6ZGRfbaFM0G01ucholMdOWvtwlartc3FsNi2OwR8/JIO7pmIblVKrexOYzVatdvtBUKIrS7WENEblFKchK7rx5kgxhh2OLypaw0AIIQ4bWRkxPXm00XFQLfVWn8TEd8aAgIivitJEj7b1OIZHx9/pbXWteDQRVJKdnTs+nEmSJqmHyAipwP31NTUi84555z/27VVsaEzAsaY/wkAIXUx/klKeZaz4h4J3HnnnS8cGhp6xEU9Il6aJMlfOsm4NOa2xhhONOBaTXR4UNP8uOIb0l5rfQvnHPPpAxF3JUnyPB/ZXshkaYAmHXVfJqX8by4yzjtIJIgLvOW29Uyu9oyRUkrn9VDuCJ/VVlmCxFesXi2J2fX65Eg+uMc6EaTKr1jxkF4xjrTb7bcKIYLumRDx6iRJLq/Y0A5rTmUP6fEzb7WWkM+F2Qwj4PxmfEdQm2JGVf7MGy8KK8IRn0/uhzG9dmW4K3tRGF1NqsGONE0vIqK1odYg4hVJkvxZaD9ly/vsnKW4mkRnxbKXwqH6jDHvAIAbQi1BxE8mSeIaOh2qNhf5yjorRnf3XObXu5N2u/1OIcT13h08K+gVo52D3ly6qKy7ewyYymV+vTrRWr8LEb/uJXyAECJ+IkmSq0L76aV8ZQOmGBRjTAy5LXl1+BSynMlERLw8SRJXT4iSR3tkdZUNuc0IEpM2HHkOc2uRpuklRPTVHDp0drXIQWchXRhjqpu0Iab9KWTOZ+zUGPNeAPjrUI2I+PEkSVyrgYWqLUS+Dml/YuK4Qqb+uZ222+33CyGcvE9nMouL9CilvMuQlTBUJxWVTxw3Pj4eU486Tal7Y631BxDRKazgMFr+WEr5WXcLqitR+dSjMXl1sYvHGPNBAOCClUEPEX1UKXVtUCcVFK588mqf8ge+qR8rOD+FmpSm6R8SUXAWfCL6iFLqc4Ua26POfc7ApZY/YFxcC+gg4iNJkngVMenRPJSu1hjzRwDw+RwUf1hK6VQeIAedpXWRpunDRNR18abSC+gwEj4l2ADgzDp5jJY24/t+cFYjYvDrUL/XYTHGnAEArnU+elKC7XJEdM2WWDuv0TJIkqbpR4go+CBtrf1Qq9UKPruUMWZfHcaYDwOA06sjEX1CKeXlOeAdYpmm6WuJ6PsuAw0t6u6iqy5tjTFcAjqPT7ADkb0yTdPbiehcl/lFxNclSfIDF5n9bb0Jkr1m/TsAzO9WMSJO8rujlJIDdAb+SdP0Y0QUfHlHRJcqpYLvS6o+IcaYeXyWJaJhB1ufkFK+wKH9c5qGEuRvAOBCR+UXSCnXOcr0XXNjzMcBwCnDxkwgWGs/0Gq1uMhO3z/GmPMB4DbHgd4ipfROhxREkDRN309Err9cX5JShhaodMSoWs211pchotc78UEjeZ+U8ivVGl1x1hhj+HzFd0RdP4j4gSRJvH9AggiitT4dEV3jmB8CgFMHNU9WmqaXE5Hrx41DFgQRvVcplYcDY9eLrZcNszQ/9zhWlQIiOkMptd3X9iCCZOcQTil6qosBnNwsSZJbXWT6oa1n8dOZhn6JlJKL6QzM45nz6x4p5StDQAomiNb665zX1cUIRLwpSZLQ1P0uKnveNk3TPyWiPGK/3y2lDA6a6jkgjgb4ZLInouuVUkEVuYIJ4pOwjIh2WmtfMTo6+qgjTrVsboy5AgA+FWo8Ef2BUiqPcNtQU0qVHxsbO0EI8VNEfL6j4rdIKW9xlHlO82CCcAju0Ucf/RMiOsnRkIF4TWi32xcJIYKzjwDAO6WUwYkaHOeoEs19oikR8cFdu3ad5lqT8OABBxOEO0zT9LPsHOeI5nop5XmOMrVqPjEx8apOp3MXAJwQaPjFUsobA/uorbgxhmt6uF4OXpskyUdDB50LQYwxiwBgs4cxfe2blYfbOhG9QymVxw7kMT29F/H0vWLDF0spt4SOIBeCsBHGGCYIE8Xl+byUcrWLQJ3a5lC22bngS53w6cZWYwz7XbH/lcuzRUq52EXgcG1zI4jW+iOI6Opwxy4nvItwAH7fPcYYvvXl21+f5/ellE5FKn2UVFnGGPPSzHN3noudeQaK5UaQTZs2ndRsNrkk1pDLYKy1V7ZareAvPC46y2rr64hIRG9XSgVlay9rjEXqabfbnxJC8BdAl2dqenr6tKVLlz7oIlT4DsIKjDE+vlm8e/Au0ncOjO12+2whxEbHiXqrlJJxHOiHHROz3YN3EZcnyPfqYEW57SDccbvdvkAI8bcuo8na9m2ciKN7dvB3ew/sKyniE/fBA7HWvrHVark6NB4Wg1wJku0iPof1H0kpz6zkTOVglDHmPgB42eG6IiIOG3i/UupbOajriy6MMRw1yNGDLk9uh/P9SnMnSLvdvkQI4exER0QfV0oFx0a4oFlm21l+EW9uNBpXLVmyxLWkcZnml6pLa70GET/tqtRa+55Wq/U1V7nZ2udOkCy5NXv4OjkwAsDjRLRIKfXTPAdYpb4mJiZe2Ol0Xm2tfU2j0dje6XR+3Gq1HqiSjb22RWv9CkTk+4tfdbTlnsnJyTNCb84LPYPs79w33gERr0+SJMi5zBHU2LxiCKRp+nUicnJ+5SEQ0eVKqdyTcue+g7Cx7Xb7xUII3kVcfwVACPGGkZERdi2Iz4AhMD4+fp619jsew37cWntGq9V62EN2VpFCCMIaPf2zWHSrlNL1Rj5vXGJ/PUDAGMOvVgtdVXO6pDz8rmbSWxhBPKMNn7ax3w/srgtgENr7Hsyz9RIUNTgbvoURJNtFriKiy1wnGBF3dTqd5a1Wa8JVNravHwLtdntJo9G4g4iOdrW+6PruhRJky5Ytv7J3716+FzndY+A/nJqaWr5s2bLHXGVj+/ogsHHjxuOHhoaYHGd5WL19zpw5ixctWvQfHrJdiRRKELbAJ+Jwv+WI+M0kSd7e1Uhio1oikKbpzUT0Nk/jC/c8KJwg2avWjUTkFYNORFcopfKI5facgyhWFAJa608i4pU+/ZdVLaAUgmQVgfhVy/mzb3YIuzC6Yfgso+rKaK1XIqJvvDgXkeWAKE4DVOhTCkF4BJ7xIk8PntNNTk9PLx8dHf1xoWjEzktBYGxs7FXNZpPPHV2XMDjQsDzjPY404NIIkp1HxgCgdSSjDvP/twshzh0ZGfm5p3wUqwAC4+PjL7HWrvf5cJOZ35ZSjpY1lFIJorXmS6C7ENH5c14GyPeklL9TFjhRT/4IGGNcS4g/YwQR7QKAs5VSW/O3bOYeSyVItotcCgBfChigdzGUAJ1RNAcEPIsuHai59BIPpRMkIwm7JL87APM7pZTLA+SjaMkIGGPuAIBzAtReJ6W8JEDeS7QnBNm8efP86elpzhf1Gi+r9wkNfJb4AOxKFfXJyn6QgXc3m82zFy9e/ESphvMHorIV7teXpqm01m5CxIavDUR0tVLqcl/5KFc8AlrrqxDR2d1ov2VE1BFCLE2SxBRv7aEaekYQNiXk0+8BAH5RKfWhXoAXdc6OgNb6C4gYVAumzE+6M42mpwTJSLIWES8KXGw3SCnfGdhHFM8RAWPMNwDg4pAuiegmpZSXB0aI3gNle04QNsYYswEAQg/d3+50Ou8dHR39RV7gxH7cERgbGzuu0Whw1as3uUs/R+IOKeWKwD6CxStBkGwn2YqICwJH9N1Op/O+eOMeiKKnON+QNxqNvwaAoLsqItqmlHIOnPI0e1axyhAk20n+GQB+M2Sg7JZirV0dfbdCUHSXZd8qIcTnfN1HDtD4L1LK33K3oBiJShEkI8m/AsBLQocbvYBDEexePsQr9yAtP5dS/kb3motvWTmCZCThNKSu1YQOQYvjSaamplbHoKtiFlIW7MS7hm88x4GG7ZRSOiWpLmZUz+21kgTJSEJ5AICIP+x0Oqtj+G4eaD7bRxYmy+TwiQQ8xBgpZSXXYiWN2o+e1vpRRDw+dGo5xp2zyPdz5sZQjFzkOcECZ133iSE/WA8RPaaUCq3A5WK+U9tKEySvg/sBiGwVQlwT8245rZFnGmd5q9b4pOY5jMZKHchnsrHyBMlIEhJHMtPZ5Hpr7TX9nObUjwIzS3E6UCHEGp+Mh7PYUWpchy8etSAID05r/S1EfLPvQGeQ41zAn4mvXbMjmuWr+phvuPRMvRPRrUqplTnOZWFd1YYgBZGEu+UUqVxBlt1V+q6Ij8/KyYrXsJvIOzxKEMyqsk7k4IHUiiAZSfLw3ZppEn9mrb1RCMFE6cuaiUciC9cEtNZeLIRgYrhWdjpS95wxs+e+VUc08qAGtSNIRhKuyX5NiKv8LEDxLnID7ypSSt5d+v7JSi0zKXjXyP0ugl3WAWCNUurauoFZS4IwyBxPQkRccCck6OpI88XJBW7vdDrrR0dHHz1S4zr9/7GxsRMajca5AHAeAPB/i3ruRsQ1vYrnCB1UbQnCA88iE5kkIeG7R8SQiHYKIbgkw3oiWi+l3H1EoQo2MMbMRUQmw7nW2vMQMdhb4QjDvK7ZbK7pRSRgXvDXmiD7QTDGXMq7SUC2FBc8H2KiCCHMnDlz0gULFnB9wco+27Zte8HevXsTa63MdooTizaWs4/wriGl/HLRuoruvy8Ikp1LFmZpLH3zbvlgzTvJFmstu+rfoZT6B59O8pbRWv82ES0XQrDLONdamZu3jln6a2eOoqWl5ilybH1DkP0gZWG8HAPtleY0EGw+p4wR0fcB4AFE5PqD90sppwP7nVHcGNPk6rlEdDIAnIyIrwMATqrWC9cNvlfiHAG1O4jPNjd9RxAeLOcC5kQBvgmzC1jMDzFZrLVMGn5F2yGEeKLT6ewgoh3NZvOJycnJHUNDQ09n7Ziampo/PDw8b3p6ej4izms0GvOstfP5CxMRnSiEODkjReGvS91gwYmkmRxl5Mrtxp482/QlQQ44m1wIALybONcnyRPkPu5rOwAwMXyTUFcemr4mCKPPRXymp6d5N/FOPVP5WeyBgVzZqdlsXl1k8ZoeDOsQlX1PkAPOJqcLIVZlr129OJ9UYb5DbXicX6estWuVUrx79P0zMATZP5NcohoRV/EfADi172c4nwHeQ0R8zlhbRKnlfEwsppeBI8h+GDds2DA0NDS0ineV7FNoMQjXu1f+hL12ampq7YoVK6bqPRQ/6weWIAfC1W63LxBC8IH+fAAY8oOyb6SYCOustbe0Wq3b+mZUngOJBDkAuE2bNp3UaDTOR8QLBnBX2UJEt3U6nXVLly590HM99Z1YJMhhptQYsygjyvlEdFLfzfy+0nZMhHVMDCnlln4cY+iYIkGOgCCfVYaHh5kkyxBxMd9ch4LeY/n7iWgzIm6cnJxcN6hni27nIBKkW6SydmmavhYAEq6ySkRL8sjf5WiCa/OdiDjBzs8cJZAkyQ9cOxjk9pEggbPPr2JEpBCR41NejohelVsDzXhGnIgeQcR7icggoo6vTmHIRoKE4XeI9MaNG583d+7clwPAKdZaJswpTBz+NwAcl5M6zmB/X0aE+4QQ9/K/d+/efe+yZct+mZOO2E0dY9LrPGt8njnmmGOObTQax+7evfv5QohjiehYRHz6D/+dx4eITxLR0xxrqo0AAACMSURBVH/479baJ+fOnbuz0+k8+dRTTz0Zzw3lrYK4g5SHddRUQwQiQWo4adHk8hCIBCkP66iphghEgtRw0qLJ5SEQCVIe1lFTDRGIBKnhpEWTy0MgEqQ8rKOmGiIQCVLDSYsml4dAJEh5WEdNNUQgEqSGkxZNLg+BSJDysI6aaohAJEgNJy2aXB4C/x9V4eh9iYnq8AAAAABJRU5ErkJggg==',
    //游戏参数
    buttonAnswer:'',
    problemNumber:'',
    problemNumberAll:[],
    imageSrc:[],
    trueAnswer:'',
    answer:-1,
    score:0,
    tips:'',
    currentNum:0
  },


  onClickShow() {
    this.setData({ show: true });
  },
  onClickHide() {
    this.setData({ show: false });
  },

  getsize(){
    let that=this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          windowHeight:res.windowHeight,
          windowWidth:res.windowWidth
        })
      },
    })
  },

  addScore(){
    var that = this
    if(that.data.buttonAnswer == that.data.trueAnswer){
      this.setData({
        answer:1
      })
      db.collection('userScore').doc(that.data._id)
        .update({
          data:{
            score:this.data.score+1
          }
        })
        wx.showToast({
          title: '答对了',
          icon: 'success',
          duration: 1000
        })
        wx.vibrateShort({})
    }
    else{
      this.setData({
        answer:0
      })
      wx.showToast({
        title: this.data.tips,
        icon: 'none',
        duration: 2000
      })
      wx.vibrateLong({})
    }

  },

  buttonLeft:function(){
    var that = this;
    this.setData({
      buttonAnswer:'high'
    })
    console.log("buttonAnswer:" + that.data.buttonAnswer)
    this.addScore()
  },

  buttonRight:function(){
    var that = this;
    this.setData({
      buttonAnswer:'low'
    })
    console.log("buttonAnswer:" + that.data.buttonAnswer)
    this.addScore()
  },

  start:function(){
    var that = this;
    setTimeout(function(){
      that.getProblem()//获取传送带上显示的图片
      that.start()
    },3000)
  },

  getProblemPicture:function(i,Number){
    var that = this;
    //console.log(i + "+" + Number)
    db.collection('classifyGameBank').where({
      number:Number[i]
    }).get({
      success: (res) => {
        //console.log(res.data[0])
        var string = "imageSrc[" + i.toString() + "]"
        that.setData({
          [string]:res.data[0].src,
        })
      },
      fail: err =>{
        console.log("错误")
      }
    })
  },

  getProblem:function(){
    var that = this;
    var Number=[],currentNum = that.data.currentNum;
    var i = 0;
    for(i = 0 ; i < 5 ; i ++){
      Number[i] = that.data.problemNumberAll[currentNum + i]
    }
    console.log(Number)
    //从数据库中获取第一张图相应编号的题目答案和提示
    db.collection('classifyGameBank').where({
      number:Number[0]
    }).get({
      success: (res) => {
        //console.log(res.data[0])
        that.setData({
          trueAnswer:res.data[0].highOrLow,
          tips:res.data[0].tips,
          currentNum:currentNum + 1//每刷新一次currentNum加一
        }, () => {
          console.log("trueAnswer:" + that.data.trueAnswer)
          //从数据库中获取传送带上5张图对应的图片
          var i = 0
          for(i = 0 ;i < 5; i ++){
            that.getProblemPicture(i,Number)
          }
        })
      },
      fail: err =>{
        console.log("错误")
      }
    })
    //console.log(that.data.currentNum)
    //console.log(that.data.imageSrc)
  },

  getOpenid:function() {
    let that = this;
    wx.cloud.callFunction({ //调用getOpenid云函数
      name: 'getOpenid',
      data:{},
      config:{env:"fit-gc46z"}
    })
    .then(res => { //调用getOpenid成功进行以下操作
      console.log(res);
      that.setData({
        openid:res.result.openid
      })
      //从数据库中获取计分记录的id
      db.collection('userScore').where({
        openid:this.data.openid
      }).get({
        success: (res) => {
          this.setData({
            _id:res.data[0]._id,
            score:res.data[0].score
          })
        },
        fail: err =>{
          console.log("错误")
        }
      })
    })
      .catch(err => { //调用getOpenid失败打印错误信息
      console.log(err);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid();//获取用户的openid
    this.getsize();
    var i = 0;
    //生成100个随机数放入数组
    var numberAll=[]
    for(i = 0 ; i < 100 ; i ++){
      numberAll[i] = Math.floor(Math.random()*6+1).toString()
    }
    this.setData({
      answer:-1,
      tips:'',
      problemNumberAll:numberAll,
      currentNum:0//记录当前传送带上第一张图片在数组problemNumberAll中的位置
    })
    console.log(this.data.problemNumberAll)
    this.start();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})