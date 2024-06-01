<script>
  let nums = [1, 2, 3, 4];

  function addNums01() {
    let addNum = nums.length + 1;
    nums.push(addNum);
  }
  function addNums02() {
    let addNum = nums.length + 1;
    nums.push(addNum);
    nums = nums;
  }
  function addNums03() {
    let addNum = nums.length + 1;
    nums = [...nums, addNum];
  }
  function addNums04() {
    let addNum = nums.length + 1;
    nums[nums.length] = addNum;
  }

  $: sum = nums.reduce((total, currentNum) => total + currentNum, 0);

  // オブジェクトでもリアクティブに動くか試す
  let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    obj02: { bar: "foo" },
    greet: function () {
      console.log(`Hello, my name is ${this.firstName} ${this.lastName}, ${this.age}, ${this.obj02.bar}`);
    },
  };

  // リアクティブで動くか確かめる
  $: person.greet()

  // リセット用に作った関数
  function a00() {
    const aa = {
      firstName: "John",
      lastName: "Doe",
      age: 30,
      obj02: { bar: "foo" },
      greet: function () {
        console.log(
          "Hello, my name is " + this.firstName + " " + this.lastName,
        );
      },
    };
    person = aa;
  }
  // 代入だから リアクティブに動く
  function a01() {
    person.age += 1;
  }
  // リアクティブに 動かない
  function a02() {
    const bb = person.obj02;
    bb.bar = "baz";
  }
  // 代入だから リアクティブに動く
  function a03() {
    const bb = person.obj02;
    bb.bar = "baz";
    person = person;
  }
</script>

<button on:click={addNums01}> Add a num 01 </button>
<button on:click={addNums02}> Add a num 02 </button>
<button on:click={addNums03}> Add a num 03 </button>
<button on:click={addNums04}> Add a num 04 </button>

<p>{nums.join("+")} の合計は {sum}</p>

<button on:click={a00}>リセット</button>
<button on:click={a01}>add age</button>
<p>{person.age}</p>
<button on:click={a02}>obj02 bar 変更</button>
<p>{person.obj02.bar}</p>
<button on:click={a03}>obj02 bar 変更 a03</button>
<p>{person.obj02.bar}</p>
