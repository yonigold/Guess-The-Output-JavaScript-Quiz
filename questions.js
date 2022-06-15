function ArrayBoolean(){
  if([] && [1]) return [true, true];
  else if([] && ![1]) return [true,false];
  else if(![] && [1]) return [false,true];
  else return [false,false];
}
ArrayBoolean();
