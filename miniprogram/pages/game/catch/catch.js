const db = wx.cloud.database({
  env: 'fit-gc46z'
}); 
Page({

  showTip:function(){
    var animation1 = wx.createAnimation({
     duration: 1500,
     timingFunction: 'ease',
     delay: 0
    });
    animation1.opacity(1).step()
    animation1.opacity(0).step()
    this.setData({
     animation1: animation1.export()
    })

    var animation2 = wx.createAnimation({
      duration: 1500,
      timingFunction: 'ease',
      delay: 1000
     });
     animation2.opacity(1).step()
     animation2.opacity(0).step({
       delay:0
     })
     this.setData({
      animation2: animation2.export()
     })

     var animation3 = wx.createAnimation({
      duration: 1500,
      timingFunction: 'ease',
      delay: 2000
     });
     animation3.opacity(1).step()
     animation3.opacity(0).step({
       delay:0
     })
     this.setData({
      animation3: animation3.export()
     })
  },


  /**
   * 页面的初始数据
   */
  data: {
    left:0,
    bottom:1200,
    score:0,
    content:"",
    src:"",
    isdisAble:true,
    TOF:true,
    fallInterval:0,
    startShow:true,
    stopShow:false,
    currentOpenid:"",
    fallDown1Show:false,
    fallDown2Show:false,
    basketX:150,
    initX:0,
    initY:0,
    basketImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQVR4Xu1dCZQVRZZ98akqUVC7EQFxQTb3FUYRhRaRFld6ERHBDdqlPToKTP1IRdr6n0Gnfmaprc7pceyx7XZDETcUV5AGRVHBFXFDBVtUbFlEy2ap+jHnJj/LX8VfconMKs33zqljYcXy4kbejIz34r0QxMIIMAJFERCMDSPACBRHgAnCTwcjUAIBJgg/HowAE4SfAUbAHwK8gvjDjWvFBAEmSEwmmofpDwEmiD/cuFZMEGCCxGSieZj+EGCC+MONa8UEASZITCaah+kPASaIP9y4VkwQYILEZKJ5mP4QYIL4w41rxQQBJkhMJpqH6Q8BJog/3LhWTBBggsRkonmY/hBggvjDjWvFBAEmSEwmmofpDwEmiD/cuFZMEGCCxGSieZj+EGCC+MONa8UEASZITCaah+kPASaIP9y4VkwQYILEZKJ5mP4QYIL4w41rxQQBJkhMJpqH6Q8BJog/3LhWTBBggsRkonmY/hBggvjDjWvFBAEmSEwmmofpDwEmiD/cuFZMEGCCxGSieZj+EGCC+MONa8UEASZITCaah+kPASaIP9y4VkwQYILEZKJ5mP4QYIL4w41rxQQBJkhMJpqH6Q8BJog/3LhWTBBggsRkonmY/hBwRZAPP/ywd7t27Yb06tXrdn/dcC1GoPUQ+Pjjj3sopcb17t075VWLggRJp9PDlVK/SCQSI6uqqnbv3r17h65du1Lfvn3P6dWr191eO+HyjEBrIvDCCy88umbNmhHr16+nr7/+elNjY+M8Ipq166673jFu3LiNpXTbhiCpVOpaIppcqFKXLl2+X7169VnpdHpWaw6Y+2YE3CJw44033rlly5ZzipR/J5FIjKqurl5WrL1mBJk6dert2Wx2PAofeuihtPvuu9PPfvYzWrduHb300ksEBiYSie82b9582LRp0z5yqySXYwRaAwHTNPGixwuf9thjD+rdu7etxvfff0+rV6+mTz/91P53VVVVtwkTJqwupGMTQRYuXDj32WefHYpCxx13HO25557blH/66afthpVSD6fT6d+2xqC5T0bADQKmaZ5KRI+h7AEHHGD/tJRly5YRfkCeAQMGpAvtUWyCfPTRR+OWLFnyFxTGyoGfQlJfX09PPPEE/etf/yIhxMk1NTVPulGWyzACUSNgmuYjRPSr3XbbjY455piC3W/cuJHmzJlD+O/AgQO/Gjx4cNeWBZtWkFtuuWXTmjVrqoYPH07YkBeTN954g9566y2sIg+m0+mRUQ+c+2MEyiFQW1s7PJFIPIVyRx99NHXv3r1olUWLFtFnn31Ge+21112jR48+tyhBUqmUwh/LEQSryOOPP06bNm1C8eNTqdRz5RTmvzMCUSJgWdYDSqmReNEPHjy4ZNfOZ5ZSKm0YxjZm4KYVpKamZoYQ4oyjjjqK9tlnn5KNvvbaa7R06VKUuTeVSo2NcvDcFyNQCgHLsoYqpeaiDJ5l7C9KySuvvOJs1k+RUj5RdAWpqam5SAjxv9icY5NeSr799lt7FdmyZQusWoOuueaahTxtjEBbQMA0zXuJ6KwuXbrQL37xi5Iq5fYg2Y0bNyYaGxt7XnXVVStKEaS7EGIJEXUbNmxYye82NLJ48WLbAkBEd6RSKds0zMIItCYCpmnie2oBdBgwYEBBS2y+fu+99579JaSUmm0YBqxe20gzP0gqlfpPIprSo0cPOvbYY0uO9ZtvvrFXkcbGRnRwRDqdXtya4HDfjIBpmn8jonM7d+5MQ4YMKQkIvn7mzJmj6uvrhVLqN4ZhwOpVmiDTpk3r0djYuEQptcsJJ5xA3bp1K9kJvt/AQiK6NZVKXcJTxAi0FgKZTOYoIcRL6P+II44gvORLyQcffGBbY4noGSnl8GJlCx01yRCR7NWrFw0aNKhkJ/Cwz549m7LZbEMikeh3zTXXvN1aAHG/8UbANM0/E9EFnTp1oqFDbX93UcFXz9y5c9WGDRvw/I+SUj7gmiBTpkzpW1lZiVVkx5NOOol23XXXkp3Bjgw2EtHNqVTqinhPE4++NRAwTbMfEWH/TP3796eePXuWVGP58uUEfx4RzZNSlmRTwdO8NTU1NwghJvbp08d2tJSSNWvW2KuIEOL7LVu29Js2bdr7rQES9xlfBEzT/BMRXfLzn/+cjj/++JJAKKVs7zn20EKIsclkElavolKMIAfkLFrtTznlFNpll11KdoqDjB9++CE261Y6nZbxnSoeedQI1NbWHpxIJLB6VPbr14+wNSglH3/8McGPR0QLpZSl9xBEVDRgKpVK3UJEl+277762yayU/POf/6Qnn7SPZa1XSh2eTqe3sSdHDRz3Fw8ELMu6SSl1+c4772yvHolEouTAn3vuOVq7di3KjJNS/rUcSkUJMnXq1EOVUkuEEO1OPfVU+9h7KVm4cCEOPaLItFQq9YdyHfPfGYGgCNTV1e2XzWaxeuxw2GGHEbYEpWTlypX06quvosgrUsrSb/1cQyVDbmtqam4VQly8//7726azUoJj8DgOL4RYvWnTpsOvu+66L4ICwPUZgVIImKZZR0T/seOOOxKc2+3atSsJ2N///ndEFOIZvSiZTMLqVVbKEeTfhBCvVlZWEvYiO+20U8kGn3/+efrkk09Q5g+pVGpa2d65ACPgEwHTNBH9hNVj50MOOaTs+cF//OMf9PLLL2Of/LphGP2JyD6cW07KJm1IpVJI1DD+oIMOImyCSsmXX35JzzzzDBi6MpvN9kun0/bHHgsjoBsB0zT/i4iu7NChg7164CVeShYsWEBfffUVCHKpYRiwermSsgSZOnXqwGw2++J2221H2ItAoVIyf/58wreeEELW1NRYrrTgQoyABwRqa2v3ylmuOuPFvd9++5WsvWrVKjtknIiW1tfX90+n05vddleWIGgonU7fqZQ6B0sZNkOl5PPPP7ftzEKI93fYYYf+yWSyHuVramqqdtppp64NDQ1ds9lsR7cKcjlGAAhUVFSsraysXI3Y8UwmM1UI8YcddtjBtlzh5V1KYED64gt7SzxBSnmTF0RdESSVSuHc8HwohL3I9ttvX7KPefPmEb75Kioqbq2qqvqOiOCtLP195kVrLht3BJCqpz2SMBx++OElsQAxQBAiel8I0fTCdgugK4LkVoD7hBBnQqGDDz64ZPs4wPjmm2+WtSq4VZLLMQKFEIDPA6bdvn37Fn1p49MKn1hElJRSwurlSbwQZJgQ4tmOHTvae5GqqqqCHa1YscKOFSkkWHlgkiu3JHoZAdpCu+UcRF7a5LLhIFBu/1qqVxxpQuw4Qr5bCr5ssBfZa6+9mv0Jm3Jszono48rKyv4TJ05c73VkrgmChlOp1INE9FscCDvwwAO36QsufLjy8wWRXVgKseqAXDokm83a0YwNDQ2wSuhoktuIAAHkMcCcBRH4OhDRikOyuX1FU3MtN+ww6+JTXwgxOZlMwurlWTwRJJ1On6SUegJufawi+Y6ZvKXMVqKiosKOCQaZyjlwvGgNYmzevJmJ4QW0NlIWIa44aq5DhBB2+qm8BCJ2s0jSgGQNcAjCMUhEn+X2Hl/56dcTQXKrCNKOnnbkkUc2mddwUBF7Dkewarg5nuJVYZAjl03Fa1Uu3wYQwAON1V+ngCgvvvhisy8X+EXwTObcDalkMpn226dngtTU1IwQQjyKo8UgAdI44gCY8+Di5O95553nV5+i9bBq4Iflx4kAPoXxrIQlOOaEVQOCZxB7FqXU6i1btvSfMmWKvUv3I54JkltFcHT3RHxC4a0AtkKwCRs5cmTZ4/FeFWVyeEWs7ZXHyoFnJSzBSnLfffc12+Mopa41DGNKkD59ESSdTp+ulJoJpuYPeuDAgUjhGESfbeoC2DDfPFqV5caKIoDNedifx9999x09+uijjg4NjY2NfQul8vEyTb4IkltF5rRr1+54x2QLU+u5555b9iiKF+VQllcPr4i1zfKOcSVM7bCKIHd0Lt4DBoGCua686BCEIKOrqqqmw1oFwRGUcsHyXhRzymKF0mX58NM/19GDAF50IEnYgtPk2LTnxFVQVCmdfBMEjWYymQ1CiB3x+6hRo8qmeSymCOzahQSfV7qXZTiVvEjUn3de9cNYfgw6OiZe/DcMad++vd0sXqgPPfSQ00WdlDIZpL9ABDFNcw0RdYICF1xwQdl4kWKKIr9WVFLonohSfSOcGD9RCDLIlMsiU0gPEAQnGKIQEHjvvff23JVj4kVgXRgkcfJg4aU6ffp0Wz8hxF3JZHKbjO1elA9KEKR4t8+cTJo0yUu/zcq+++67BevCNKjbbu51ckGOQscbfA+2REVYAf0SBMcqohKvGOabeEGQMMS5sgP7kLvvbrpGs2RSODd6BCUI7Mv25Qvjx48vG7fuRqH8MnjTBD2a4LVPLq8fgbBNvPka45N85syZzv96WEoZ6Ca0oATBSTD7AobTTz+9bLpHr9DzBt0rYm2zfBQmXmfkcBbCaZiTVt+D3EFE50MZBK4Uu7rN77ThbRCF5cOvflzPHQJRmHgdTRBqsWSJnWQRnvRLDMO41Z2WhUsFXUHgpURGePtQYrmM8F4VZR+IV8TaZvmoTLwYPaJZnX2OUuoEwzCeDYJKIILU1taOSSQS90ABBK6MGDEiiC7b1MXSHIbFQ6uS3FhZBHSe4i3VGWKCZsyY0eQaaGxs7H3VVVc1j78oq23zAoEIYlnWAKXUIjSJOxngSdcpcBCGeX5Hp67cVnEEwjjFW6g3hFXceeedzp+UlLJ0mkUXkxaIIHV1dZ2z2aztJIBH/fLLL2/qEs6/YuZbF3o1FYFJ0avzLGy/gF9fgDMo+Cyicu559fvkz03YOKIvZOxEfJEOySeIUmq5YRh9g7YbiCDo3DRNhDHaI7z44oubzmIxQYpPDRPkB2x0EgT+lnvv3ZqsXSn1tGEYJ7YFgsBkYGcsOfPMM2n33XcPqlOz+nDScVitVkgjbQyfyVHtI/OPmSil/mQYxqVBB6tjBZlBRGdAEdyxXihWPYiS7AsJgl7r143SxIvTBM8+22S0miSlvDEoAoEJkslkaoUQBhRBAFW5C3e8KszedK+Ita3yUZp4cevy66+/7nxi/cowDISHB5LABKmtrb0wkUjcBi2QAvLkk08OpFDLyuws1Apn5I1FZeLFwJAX2jlYWlFRcdCkSZPeCTrgwASxLGuoUmouFMGtuGPGjAmqU7P6nKhBK5yRNxaVibfFIUUc+tx+3Lhxgc/WByZIXV1dj2w2a5+1RlThJZfovQ2anYWRP9NaO4SpOAojC5yEd911l627EGJVMpncQ8dAAhMESpimiVAxO7Tw0ksv1Zo5kWPSdUxz67QR5Sne/BVECLEgmUweq2PUugjyHhHtC4XGjh1rJ+7SJXj7RBWPoUtnbmcrAlGaeFsESt2RTCbH65gHXQSZTUT27hy5svbZZx9Puj3wQNF73D2146Yw7n73Ioh2RI6lKARZYpCQz6sgvebSpUu9VvNd3i2GhUy8uD8mDMEVgQ8//LDziTUlmUxeq6MfLQTJZDK3CCEug0KDBg3yPMm3345LrKIRODO9CAiSu1bOSzVfZXv27OkZO3QEguQlKvDVt9tKuIbPLUEKmXhBkGI5CNzqUKgcXiyOD0QIcVYymbwvSHtOXS0EsSxrglLKdsoggfAJJ5zgSbfc7bhF6+BNpGujt+eee3rSDQ9flOJVP4cgbVHHQsmqWyac1qX3unXrmnwgiUTiyOrqavs626CiiyCnKaVspwwm+IwzbMe6NmFfiDYoI20oKhMvBoXVw4nLr6io2GXSpEla7sfUQpC6uroDstms7ZTB/R8XXnih1ongwCmtcEbWWFQmXgzonnvssCTIOimlnWlHh2ghyM0337zdxrwTaVdccYX2Kw9058fSAR63URyBsJNV5/fcwkm4WEp5hK650UIQKGOaJj7WbefM+eefT506aSOxbS7kwCldUx5NO1GaeFsQ5H4p5Whdo9RGkEwmM18Igcs+6de//jX16tVLl452bqyoAoy0KR3zhqI8xZvvAyGi66SUV+uCXydB/iKEGAfFjjvuODvLIu6UCyp77LGHfYUbMne7FViewrKWODr48Vc4daPMJBlEzyA4ekn6h+vFg0iLdKO/k1L+JUh7zT7fdDVkWdbVSqlpaA834eJCxdwVWIG6GDJkiE0QL4FTYfsFvPgCCg3+ySefpA0bNgTCxW1lr36f/HbDxhF94TkJShCc4MVJ3pwMkVJq80ZqW0EsyxqtlLKTosLhhUHjUs9Sgm9HvGmc/xYq269fP5sg+MRym4Y0Cs+yW2dZMYK4fcCDlguiZxAc3fqtcFNZUIK0yIW1p2EYwT9dcsBrI0hdXd0R2WzWzkKNDTo26jqFA6d0ohl+W1GaeHGKIHfaYZOUcmuad02ijSA33HBDp4aGBvvQEo4eT5gwQZOKW5thZ6FWOENtLEoTLwYya9Ys5/jKMinltveTBxitNoJAB9M01yGTC34Pch1CofFw4FSAWY64apQmXgwtz0n4mJRSa/ZCrQTJZDKLcSc1lMZxEz/niorNJQdORfyUB+guymTV+T4QpdQfDcOYGED1barqJsj9QohR6OWXv/wlHXzwwdp0ZWehNihDbyjKRA35PhCl1L8bhvHfOgeolSCWZV2nlLoKCuJ8/uDB9s0IWoQDp7TAGEkjhU7xhtUxjDcPPvig3Xw2mz35yiuvxBXl2kQ3QX6nlPo/aIegKQRP6RQvzkKd/XJb3hCI8hQvgtmeeuopW8GGhoZ9J0+e/IE3bUuX1k2QIUqpeeiyS5cudPbZZ+vU1ZMvRGvH3JgnBKI08ebfarv33ntXjBo1qtGTsmUKayVIbW3tXolEYiX6rKqqossus4MMy0qURy+8JnPmSzybT1+5xN3lTLy6L/FEoNQ779iRFiuklD3LPmweC2glCPo2TXMzEVXid6QAQiqgcsIE2YrQT+GW23KZTHQTBNGouXN3c6WUw8o9a17/HgZBcGXtflDkrLPOot12282rTkXLc+CUNihDayhKEy8Gcf/99zsXvd4mpbxY98C0EySTyTwuhDgFiuIc0P77769NZ3YWaoMytIaiNPG2iAMxpJSm7oFpJ4hlWTcppeybdJDIGgmtdQn7QnQhGV47UZp48+8DIaKRUsqt9l6NEgZBLldK3QQdsSE+8cTAd5g0DZcDpzTOfEhNRWnixWqVl1PtcCnlG7qHpZ0gpmnC+fEYFO3evTuNHq0t+tE+Gs9ZFnU/Anrbi9LE+80339Djjz9uD0AptZNhGN/qHQ2RdoJkMpn9hRDLoGiHDh3sa9l0ipfAKZ39clvuEIjyBfb555/TvHm22+0rKaW+fLd5Q9VOkJqamqoOHTpscvoYN24cffnll+7QLVAKIbdIJeSIm8AplHFyJPnuuExFXC7qV3BHYVQSRE8/OLoNanPG3759e9+XeL7//vu0ePFiNPWSlPLoMDDVThAoaZrmp8ghh99xqjdIfDisYPkEcRM4FfbtrOWcZeUmii/x/AGhIJd4Llq0iHJZOe+WUp5TDnc/fw+LIFj3hkAh3DgV9GLPfIK4CZyKIgOK16up8ycnCv2c/qLUEz4QmOK9ClYRPzJ79mxav3499h9pwzBSftooVycUgliW9Vel1HnoHBlOkMRBl7CzUBeS+tuJ0sQL7Z1AKaXUeMMw7tA/ohA26VDSsqyUUqoGv/fv35+OPVbLXSb2+DlwKozHQE+bUd5HmE8QIcTxyWTyOT2jaN5KWCvIOKWUnZtI97F3dhaG8RjoaTNKEy+eg/vua7rhoI+U8iM9o4iGIKFd7MnOwjAeAz1tRmniBRmdC3Pq6+sr0+l0g55RRECQG264oVdDQ4PNaN2+EHYWhvEYBG+z3Cne4D00b2Ht2rWEBHxEtEpKqeXCzkI6hvKJNWPGjHYrVqxoYrTubO/sLNT9uAVvL+pMJkhqt2DBAiQdfDGZTB4TfASFWwiFIOgqP9s7nIXIoKdL3DgLdfXF7bhDIMpk1dAIQVJvvGEfvZoupRzjTkvvpUIjiGVZzyulBkGlkSNH2jlYi8mqVas8aR7kSjYEJXkRRBRGKV71g254YUT5/V9IR7cmXpyf0iG4tDR3IqFWSmknCglDQiOIaZp341ZoKI07C3F3YTHhiMKtyPyYIwrdmnh1RRS++eabdjZFpdQlhmHcGgY50GZoBLEsa5pSyr6nYeDAgfZPMXn3XQQhuhcvqfVbtur1bBJWkKjezjBo+F1Bwj575uCIIKUePXpsM1luTbwgiA6ZM2eO3UwikTi5urpaa6qffP3CJMiFSqnb0NmBBx5Iw4cP14GL3QZHFmqDUltDUb1EHIUdL3oikTiwurraPj0ehoRGENM0cRf001Ba98237E0P41Hw32a5TCb+Wy5cE/OPWHRIfX39jul02v3tSh6VCY0g119//T6NjY3vQx+c2Bw/frxH1YoXZ2ehNii1NBS1iRer1SOPPALd10gpO2sZRJFGQiNI/s23uq9DYGdhmI+E97ajNvF+/fXX9PTT9sfJa1JKO1l6WBIaQaCwZVmfK6XsvD+ILMQmVJdwGlJdSAZvJ8pMJtB25cqV9MILL+DXh6WUvw0+guIthEoQ0zRfIiI7rQlyZHXs2NHXWPLjQZwGSnnTo4i3iDLOwhdouUpR6AmC4DPLr3iNB3n77bfprbfegolX+3UHLccQNkEeIqLfoNPTTjuNkCbSq7SMKHTqI3tGsUnhiMIfUPaaajV/fsLGEX35iShEHDri0ZVS1YZhXO/1mfJSPmyC/A8R/R4KIXDKT7RZMYKUCr0Ne2LxqVjIF+AWeHwiRGUW/SkSJC9Q6mzDMO5xi7ufcqESJJPJpIQQduCU7vtC3ITe+gGE63hDIGoTb/59IEqpYYZhzPWmsbfSYRPk90IIrCJ2CtIgVxK3HBaH3nqb6LBKR23ixakL53rxsJ2EwCxUgliW9RulFPYh7CwM6wlt5XajTFbdIhcvVVRU7DJp0qS1YUIQKkHq6uoOyGaz9uUNkIsuusi3JaslCBx6G+Zj4b7tKE28+KyeOXOmo1xoyeLyRx8qQdCRaZpLcRwLvw8dOpQOO+ww9+iXKcmBU9qg9N2Q21O8vjvIq/j666/TsmVbj10JIf6YTCa13mhbSMfQCZK/Udd9Jos36joeu2BtRJmsOu8+dJh4BxiG8Uow7cvXDp0gpmniqtsFjipjxoyhbt26FdTM67F3NOLXQfVTPPYOPKJOa+rXXI3AKaw+5aRr160pd3FM3jniTkSLpJTF4yfKNerh76ETJPeZ9R4R7YvfDznkEBo2rPBNWSAIgmCiEK/+gR/DXYXAzfkECRtDJ/1qEIIgK2IpgYcdBGm5OSeipJSyLuwx2p9yUXRimuZkIrrW6Wvs2LH2wFuKH3L4Pebg9QhGFMdX8vHwqp9TN0o98QDjE8uPuFk90C76WL58Ob388stON+82NDQMnjx58ho//XqtEwlBLMvqoJRaRER23G2pVcTrAPjou1fE9JWPwsTbwnKFvcf5hmH8Td8oSrcUCUFyn1kXENGfy60ifgbOm3U/qAWvE7aJF59W9957LzlXKiilZhqGcUZwzd23EBlBciRBIPHx+L1Lly505plnUmWlfWN0IOFVJBB8viu7zWTipwOQY+HChfTJJ5841TcqpQYbhmFfCBKVREqQTCYzQgjxqDM4XI4zatQoLWPloydaYPTUSFgmXpAD8R75FrkwrzgoNehICQJF8v0i+HefPn1oxIgRniamWOFSR+C1dMCNNEPArwWrHIzz58+nzz77rKlYa5EDCkROkNynVlOcCP49YMAAOuaYH7JHFksk5+Yinpbe9bATv/lJ0+PMfNi65T+IOKIfxDJWiAx+whcKkWPnnXe2/zdCs2fNmkX5yeWUUtcahjGlHKnC+nurECRHkuVE1NsZWL5lq5A/BORwQxC0l7+ShOkX+DFdxQbHaBCChOWAdAKmQI7p06fb97/kyf1SSn3XJPtgUasRJEcS2LI7OXrjLpEhQ4Y0e4Pkj8ktQVDH2ZOE/ZaO6wqCOJAWD7OPx29rFYRi5931Yf8/nAI3DON0341qqtiqBMmRpClFKf7duXNn+1YqJJsLKphAEMXrzatB+41DfR2ZTLAZR3Tl888/3wwyIcSUZDLZ5FhuTTxbnSA5klQjCUo+EDjYiJO/ffv2DYQP3nSYzCAJrwMp8BOtHMTEC2Igdc9TTz3VEh3kUZskpXyircDWJgiSI8m5OZJ0yQcH386I/4a1y9nM+QEPqwhIgsONvKL4QbB5Ha8mXpACuMM6hXs9CshtW7ZsSV199dVfBNdOXwtthiAYkmVZPZVSVxARfrYR7EGwT8F/8d3qd9MJkjg/mDSsMizeEChn4gUh8INPXJACTr8iclsikbiturp6iTcNoindpgjiDNmyrAE5opxVCgZMAHJmgSzt2rXzjRja2X777e2DcSzuECiUBBAvHXx6IdM80vKUkTZNDEf3NkkQR7na2tqTEonESUqpk4QQfcohzn9v2wgIIR5TSuGqgmfCupVWNwJtmiD5g7Usa2A2mz0tkUgcq5TqKoToqpTyl6pRN4rcXiEEkCXwS8Q6KaWmV1VVPTZx4sQ2tb9wM20/GoIUGkxNTU3HDh06dM1msyBLlZsBc5nwEEgkEt9VVFSs3rBhw+p0Or05vJ6ia/lHTZDoYOKe4ooAEySuM8/jdoUAE8QVTFworggwQeI68zxuVwgwQVzBxIXiigATJK4zz+N2hQATxBVMXCiuCDBB4jrzPG5XCDBBXMHEheKKABMkrjPP43aFABPEFUxcKK4IMEHiOvM8blcIMEFcwcSF4ooAEySuM8/jdoUAE8QVTFworggwQeI68zxuVwgwQVzBxIXiigATJK4zz+N2hQATxBVMXCiuCDBB4jrzPG5XCDBBXMHEheKKABMkrjPP43aFABPEFUxcKK4IMEHiOvM8blcIMEFcwcSF4ooAE5Zb1SEAAABCSURBVCSuM8/jdoUAE8QVTFworggwQeI68zxuVwgwQVzBxIXiigATJK4zz+N2hQATxBVMXCiuCDBB4jrzPG5XCPw/lS47m4m2vyIAAAAASUVORK5CYII=",
    startImg:"data:image/png;base64,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",
    stopImg:"data:image/png;base64,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"
  },


  onChange(e) {
    var that = this
    that.setData({
      basketX: e.detail.x
    })
    //此处的x是px所以需要转化为rpx ，是一个坑
    //console.log("basketX:"+that.data.basketX)
    
  },

  changeLeft() {
    var that = this
    var num = that.randomNum(50,250)
    console.log(num)
    that.setData({
      x:0,
      y:0,
      left:num
    })
  },


  getFallDown: function()
  {
    var that = this 
    db.collection('catchGameBank')
      .aggregate()
      .sample({
        size:1
      })
      .end().then(  res => {  
          console.log(res.list);
          that.setData({
            content: res.list[0].content,
            src :res.list[0].src,
            TOF: res.list[0].TOF
          })
         })

  },


  gameStart(){
    var that = this
    that.showTip()
    setTimeout(function(){
        that.fall()
    },3500)
  },


  fall() {
    var that = this
    that.getFallDown()
    var num = that.randomNum(50,250)
    that.setData({
      fallDown1Show:true,
      left:num,
      startShow:false,
      stopShow:true,
      initX:125,
      isdisAble:false
    })
    var fallInterval = setInterval(function(){
      that.setData({
        fallInterval: fallInterval,
        bottom: that.data.bottom - 50,
      })
      that.judgeIn()
    }, 200)
   
  },

  stop(){
    var that = this
    clearInterval(that.data.fallInterval)
    that.setData({
      initX:0,
      initY:0,
      bottom:1200,
      fallDown1Show:false,
      fallDown2Show:false,
      stopShow:false,
      startShow:true,
      isdisAble:true
    })
  },

  judgeIn(){
    var that = this
    var basketLeft = that.data.basketX
    var basketRight = basketLeft + 250
    var blockLeft = that.data.left
    var blockRight = that.data.left+150
    if(that.data.bottom > 60 && that.data.bottom < 160)
    {
      if(basketLeft<blockLeft && basketRight > blockRight)
      {
        that.judgeInTOF()
        that.vanishAndShow()
      }
    }
    else if(that.data.bottom < 60)
    {
      that.judgeOutTOF()
      that.vanishAndShow()
    }
  },


  judgeOutTOF(){
    var that = this
    if(that.data.TOF)
    {
      wx.showToast({
        title: '不要浪费食物！',
        icon: 'error'
      })
      wx.vibrateShort({
        success: (res) => {},
      })
    }
  },

  judgeInTOF(){
    var that = this
    if(that.data.TOF)
    {
      that.updateScore(1)
      wx.showToast({
        title: '接对了!',
      })
    }
    else
    {
      wx.showToast({
        title: '接错了！',
        icon:'error'
      })
      wx.vibrateShort({
        success: (res) => {},
      })
    }
  },

  vanishAndShow(){
    var that = this
    that.getFallDown()
    that.changeLeft()
    if(that.data.fallDown1Show)
    {
      that.setData({
        fallDown1Show:false,
        fallDown2Show:true,
        bottom:1200
      })
    }
    else
    {
      that.setData({
        fallDown1Show:true,
        fallDown2Show:false,
        bottom:1200
      })
    }
  },

   randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
},

  updateScore:function(e){
  var that = this
  console.log(e)
  that.judgeUser()
  db.collection('userScore').where({  	
    openid: that.data.currentOpenid
  }).update({
    data: {
      score: db.command.inc(e)
    },
    success: function(res) {
      that.setData({
        score: that.data.score + e
      })
      console.log(res)
    },
    error: function(err){
      console.log(err)
    }
  })
},

getOpenid: function () {
  let that = this;
  wx.cloud.callFunction({ //调用getOpenid云函数
    name: 'getOpenid',
    data:{},
    config:{env:"fit-gc46z"}
  })
    .then(res => { //调用getOpenid成功进行以下操作
     // console.log(res.result.openid);
      that.setData({
        currentOpenid: res.result.openid
      },()=>{
        that.judgeUser()
      }
    )  
})
},


judgeUser:function(e){ //判断用户集合中是否存在当前用户
  var that = this;
  let flag = false;
  db.collection('userScore') // 限制返回数量为 20 条
  .where({
    openid: that.data.currentOpenid
  }).get({
    success: (res) => {
      let user_get = res.data; //获取到的对象数组数据
      console.log(res)
      for (let i = 0; i < user_get.length; i++) { //遍历数据库对象集合
        if (that.data.currentOpenid === user_get[i].openid) { //Openid存在
          console.log(res.data)
          flag = true
          that.setData({
            score: user_get[i].score,
          })
        }
      }
      if (flag === false) { //用户不存在
        console.log("用户不存在")
        db.collection('userScore').add({ //将该用户加入用户集合 
          data: { 
            openid: that.data.currentOpenid,
            score: 0,
          },
          success: res => {
            console.log(res); 
            that.setData({
              _id:res._id
            })
          },
          fail: err => {
            console.log(err);
          }
        })
      }
    },
    fail: err =>{
      console.log("错误")
    }
  })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getOpenid()
    getApp().loadFont();
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
    this.stop()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      this.stop()
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