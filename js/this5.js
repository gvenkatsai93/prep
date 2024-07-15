const obj = {
    prefix: 'BFE',
    list: ['1', '2', '3'],
    log() {
      this.list.forEach((item) => {
        console.log(this.prefix + item);
      });
    },
    fun: function() {
        console.log(this.prefix)
    }
  };
  
  obj.log();
  obj.fun();