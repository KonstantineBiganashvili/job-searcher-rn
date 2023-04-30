import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { useRouter } from 'expo-router';
import useFetch from '../../../hooks/useFetch';
import { COLORS } from '../../../constants';
import styles from './nearbyjobs.style';

const NearbyJobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch('search', {
    query: 'developer',
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;