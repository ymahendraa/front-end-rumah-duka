/**
 * @description getRedisValue : function for getting value from redis
 * @param {string} key : key to get value from redis
 * @returns value from redis
 */

const getRedisValue = async (key: string, redisInstance: any) => {
  const value = await redisInstance.get(key);
  return value;
};

export default getRedisValue;
